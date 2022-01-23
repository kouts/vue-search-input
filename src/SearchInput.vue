<template>
  <div v-bind="attrsStyles">
    <slot v-if="searchIcon" name="search-icon">
      <i class="search-icon search"></i>
    </slot>
    <input
      ref="inputRef"
      type="search"
      data-search-input="true"
      :value="modelValue"
      v-bind="attrsWithoutStyles"
      @input="onInput"
      @focus="hasFocus = true"
      @blur="hasFocus = false"
      @keydown="onKeydown"
    />
    <slot v-if="showShortcutIcon" name="shortcut-icon">
      <i class="search-icon shortcut" title='Press "/" to search'></i>
    </slot>
    <slot v-if="showClearIcon" name="clear-icon" :clear="clear">
      <i class="search-icon clear" @mousedown="clear"></i>
    </slot>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, ref, computed, onBeforeUnmount, watch } from 'vue'
import { fieldType, FieldType } from './SearchInput.types'

const filterObject = (obj: { [key: string]: unknown }, properties: (string | number)[], remove = true) => {
  const res: { [key: string]: unknown } = {}

  Object.keys(obj).forEach((objAttr) => {
    const condition = remove ? properties.indexOf(objAttr) === -1 : properties.indexOf(objAttr) >= 0
    if (condition) {
      res[objAttr] = obj[objAttr]
    }
  })

  return res
}

const defaultBoolean = (val = true) => ({ type: Boolean, default: val })

export default defineComponent({
  inheritAttrs: false,
  props: {
    type: {
      type: String as PropType<FieldType>,
      default: 'search',
      validator: (prop: FieldType) => fieldType.includes(prop)
    },
    modelValue: {
      type: String,
      default: ''
    },
    wrapperClass: {
      type: String,
      default: 'search-input-wrapper'
    },
    searchIcon: defaultBoolean(),
    shortcutIcon: defaultBoolean(),
    clearIcon: defaultBoolean(),
    hideShortcutIconOnBlur: defaultBoolean(),
    clearOnEsc: defaultBoolean(),
    blurOnEsc: defaultBoolean(),
    selectOnFocus: defaultBoolean(),
    shortcutKey: {
      type: String as PropType<KeyboardEvent['key']>,
      default: '/'
    }
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
        props.clearOnEsc && clear()
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
          .call(document.querySelectorAll('[data-search-input]'))
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
      () => props.shortcutIcon,
      (nV) => {
        if (nV) {
          window.document.addEventListener('keydown', onDocumentKeydown)
        } else {
          removeDocumentKeydown()
        }
      },
      { immediate: true }
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
      showShortcutIcon
    }
  }
})
</script>
