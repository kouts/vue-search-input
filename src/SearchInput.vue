<template>
  <div v-bind="attrsStyles">
    <slot v-if="searchIcon" name="search-icon">
      <div class="search-icon search">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M18.319 14.4326C20.7628 11.2941 20.542 6.75347 17.6569 3.86829C14.5327 0.744098 9.46734 0.744098 6.34315 3.86829C3.21895 6.99249 3.21895 12.0578 6.34315 15.182C9.22833 18.0672 13.769 18.2879 16.9075 15.8442C16.921 15.8595 16.9351 15.8745 16.9497 15.8891L21.1924 20.1317C21.5829 20.5223 22.2161 20.5223 22.6066 20.1317C22.9971 19.7412 22.9971 19.1081 22.6066 18.7175L18.364 14.4749C18.3493 14.4603 18.3343 14.4462 18.319 14.4326ZM16.2426 5.28251C18.5858 7.62565 18.5858 11.4246 16.2426 13.7678C13.8995 16.1109 10.1005 16.1109 7.75736 13.7678C5.41421 11.4246 5.41421 7.62565 7.75736 5.28251C10.1005 2.93936 13.8995 2.93936 16.2426 5.28251Z"
            fill="currentColor"
          />
        </svg>
      </div>
    </slot>
    <input
      ref="inputRef"
      type="search"
      class="search-input"
      data-search-input="true"
      :value="modelValue"
      v-bind="attrsWithoutStyles"
      @input="onInput"
      @focus="hasFocus = true"
      @blur="hasFocus = false"
      @keydown="onKeydown"
    />
    <slot v-if="shortcutIcon && !hasFocus && modelValue.length === 0" name="shortcut-icon">
      <div class="search-icon shortcut" title='Press "/" to search'>
        <svg width="16" height="20" viewBox="4 4 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M14.526 6.10576C15.0265 6.33917 15.2667 6.88343 15.0625 7.3214L9.88541 18.4237C9.68118 18.8616 9.10985 19.0275 8.60931 18.7941C8.10877 18.5607 7.86857 18.0164 8.0728 17.5784L13.2499 6.47616C13.4541 6.03819 14.0254 5.87235 14.526 6.10576Z"
            fill="currentColor"
          />
        </svg>
      </div>
    </slot>
    <slot v-if="clearIcon && modelValue.length > 0" name="clear-icon" :clear="clear">
      <div class="search-icon clear" @mousedown="clear">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M6.2253 4.81108C5.83477 4.42056 5.20161 4.42056 4.81108 4.81108C4.42056 5.20161 4.42056 5.83477 4.81108 6.2253L10.5858 12L4.81114 17.7747C4.42062 18.1652 4.42062 18.7984 4.81114 19.1889C5.20167 19.5794 5.83483 19.5794 6.22535 19.1889L12 13.4142L17.7747 19.1889C18.1652 19.5794 18.7984 19.5794 19.1889 19.1889C19.5794 18.7984 19.5794 18.1652 19.1889 17.7747L13.4142 12L19.189 6.2253C19.5795 5.83477 19.5795 5.20161 19.189 4.81108C18.7985 4.42056 18.1653 4.42056 17.7748 4.81108L12 10.5858L6.2253 4.81108Z"
            fill="currentColor"
          />
        </svg>
      </div>
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
    escapeEnabled: defaultBoolean(),
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

    const clear = () => {
      emit('update:modelValue', '')
    }

    const onInput = (e: Event) => {
      emit('update:modelValue', (e.target as HTMLInputElement).value)
    }

    const onKeydown = (e: KeyboardEvent) => {
      if (props.escapeEnabled && e.key === 'Escape') {
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
          .call(document.querySelectorAll('[data-search-bar-input]'))
          .filter((el: HTMLElement) => {
            return !!(el.offsetWidth || el.offsetHeight || el.getClientRects().length)
          })
        const elToFocus = allVisibleSearchInputs.length > 1 ? allVisibleSearchInputs[0] : inputRef.value
        elToFocus?.focus()
        elToFocus?.select()
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
      attrsWithoutStyles
    }
  }
})
</script>
