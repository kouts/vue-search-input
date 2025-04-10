<template>
  <div v-bind="attrsStyles">
    <slot name="prepend"></slot>
    <slot v-if="searchIcon" name="search-icon">
      <i class="search-icon search"></i>
    </slot>
    <slot name="prepend-inner"></slot>
    <input
      ref="inputRef"
      :type="type"
      data-search-input="true"
      :data-shortcut-enabled="shortcutListenerEnabled"
      :value="modelValue"
      v-bind="attrsWithoutStyles"
      @input="onInput"
      @focus="hasFocus = true"
      @blur="hasFocus = false"
      @keydown="onKeydown"
    />
    <slot name="append"></slot>
    <slot v-if="showShortcutIcon" name="shortcut-icon">
      <i class="search-icon shortcut" :title="'Press &quot;/&quot; to search'"></i>
    </slot>
    <slot v-if="showClearIcon" name="clear-icon" :clear="clear">
      <button class="search-icon clear" aria-label="Clear" @mousedown="clear" @keydown.space.enter="clear"></button>
    </slot>
    <slot name="append-outer"></slot>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, onBeforeUnmount, type PropType, ref, watch } from 'vue'
import { filterObject } from './filterObject'
import { type FieldType, fieldType } from './SearchInput.types'

const defaultBoolean = (val = true) => ({ type: Boolean, default: val })

export default defineComponent({
  name: 'SearchInput',
  inheritAttrs: false,
  props: {
    type: {
      type: String as PropType<FieldType>,
      default: 'search',
      validator: (prop: FieldType) => fieldType.includes(prop),
    },
    modelValue: {
      type: String,
      default: '',
    },
    wrapperClass: {
      type: String,
      default: 'search-input-wrapper',
    },
    searchIcon: defaultBoolean(),
    shortcutIcon: defaultBoolean(),
    clearIcon: defaultBoolean(),
    hideShortcutIconOnBlur: defaultBoolean(),
    clearOnEsc: defaultBoolean(),
    blurOnEsc: defaultBoolean(),
    selectOnFocus: defaultBoolean(),
    shortcutListenerEnabled: defaultBoolean(),
    shortcutKey: {
      type: String as PropType<KeyboardEvent['key']>,
      default: '/',
    },
  },
  emits: ['update:modelValue'],
  setup(props, { emit, attrs }) {
    const hasFocus = ref(false)
    const inputRef = ref<null | HTMLInputElement>(null)

    const attrsWithoutStyles = computed(() => filterObject(attrs, ['class', 'style']))

    const attrsStyles = computed(() => {
      const res = filterObject(attrs, ['class', 'style'], false)

      if (!res.class) res.class = props.wrapperClass

      return res
    })

    const showClearIcon = computed(() => !!(props.clearIcon && props.modelValue.length > 0))

    const showShortcutIcon = computed(() => {
      if (props.shortcutIcon && !hasFocus.value && !props.hideShortcutIconOnBlur) return true
      if (props.shortcutIcon && !hasFocus.value && props.modelValue.length === 0) return true

      return false
    })

    const clear = () => {
      emit('update:modelValue', '')
    }

    const onInput = (e: Event) => {
      emit('update:modelValue', (e.target as HTMLInputElement).value)
    }

    const onKeydown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (props.clearOnEsc) {
          clear()
        }
        if (props.blurOnEsc) {
          const el = inputRef.value as HTMLInputElement

          el.blur()
        }
      }
    }

    const onDocumentKeydown = (e: KeyboardEvent) => {
      if (
        e.key === props.shortcutKey &&
        e.target !== inputRef.value &&
        window.document.activeElement !== inputRef.value &&
        e.target instanceof HTMLInputElement === false &&
        e.target instanceof HTMLSelectElement === false &&
        e.target instanceof HTMLTextAreaElement === false
      ) {
        e.preventDefault()
        const allVisibleSearchInputs = [].slice
          .call(document.querySelectorAll('[data-search-input="true"]:not([data-shortcut-enabled="false"])'))
          .filter((el: HTMLElement) => {
            return !!(el.offsetWidth || el.offsetHeight || el.getClientRects().length)
          })
        const elToFocus = allVisibleSearchInputs.length > 1 ? allVisibleSearchInputs[0] : inputRef.value

        elToFocus?.focus()
        if (props.selectOnFocus) elToFocus?.select()
      }
    }

    const removeDocumentKeydown = () => window.document.removeEventListener('keydown', onDocumentKeydown)

    watch(
      () => props.shortcutListenerEnabled,
      (nV) => {
        if (nV) {
          window.document.addEventListener('keydown', onDocumentKeydown)
        } else {
          removeDocumentKeydown()
        }
      },
      { immediate: true },
    )

    onBeforeUnmount(() => {
      removeDocumentKeydown()
    })

    return {
      inputRef,
      hasFocus,
      clear,
      onInput,
      onKeydown,
      attrsStyles,
      attrsWithoutStyles,
      showClearIcon,
      showShortcutIcon,
    }
  },
})
</script>
