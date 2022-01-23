import { defineComponent, ref, computed, watch, onBeforeUnmount, openBlock, createElementBlock, normalizeProps, guardReactiveProps, renderSlot, createCommentVNode, createElementVNode, mergeProps, withKeys } from "vue";
const fieldType = ["search", "text"];
var _export_sfc = (sfc, props) => {
  const target = sfc.__vccOpts || sfc;
  for (const [key, val] of props) {
    target[key] = val;
  }
  return target;
};
const filterObject = (obj, properties, remove = true) => {
  const res = {};
  Object.keys(obj).forEach((objAttr) => {
    const condition = remove ? properties.indexOf(objAttr) === -1 : properties.indexOf(objAttr) >= 0;
    if (condition) {
      res[objAttr] = obj[objAttr];
    }
  });
  return res;
};
const defaultBoolean = (val = true) => ({ type: Boolean, default: val });
const _sfc_main = defineComponent({
  inheritAttrs: false,
  props: {
    type: {
      type: String,
      default: "search",
      validator: (prop) => fieldType.includes(prop)
    },
    modelValue: {
      type: String,
      default: ""
    },
    wrapperClass: {
      type: String,
      default: "search-input-wrapper"
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
      type: String,
      default: "/"
    }
  },
  emits: ["update:modelValue"],
  setup(props, { emit, attrs }) {
    const hasFocus = ref(false);
    const inputRef = ref(null);
    const attrsWithoutStyles = computed(() => filterObject(attrs, ["class", "style"]));
    const attrsStyles = computed(() => {
      const res = filterObject(attrs, ["class", "style"], false);
      if (!res.class)
        res.class = props.wrapperClass;
      return res;
    });
    const showClearIcon = computed(() => !!(props.clearIcon && props.modelValue.length > 0));
    const showShortcutIcon = computed(() => {
      if (props.shortcutIcon && !hasFocus.value && !props.hideShortcutIconOnBlur)
        return true;
      if (props.shortcutIcon && !hasFocus.value && props.modelValue.length === 0)
        return true;
      return false;
    });
    const clear = () => {
      emit("update:modelValue", "");
    };
    const onInput = (e) => {
      emit("update:modelValue", e.target.value);
    };
    const onKeydown = (e) => {
      if (e.key === "Escape") {
        props.clearOnEsc && clear();
        if (props.blurOnEsc) {
          const el = inputRef.value;
          el.blur();
        }
      }
    };
    const onDocumentKeydown = (e) => {
      if (e.key === props.shortcutKey && e.target !== inputRef.value && window.document.activeElement !== inputRef.value && e.target instanceof HTMLInputElement === false && e.target instanceof HTMLSelectElement === false && e.target instanceof HTMLTextAreaElement === false) {
        e.preventDefault();
        const allVisibleSearchInputs = [].slice.call(document.querySelectorAll("[data-search-input]")).filter((el) => {
          return !!(el.offsetWidth || el.offsetHeight || el.getClientRects().length);
        });
        const elToFocus = allVisibleSearchInputs.length > 1 ? allVisibleSearchInputs[0] : inputRef.value;
        elToFocus == null ? void 0 : elToFocus.focus();
        if (props.selectOnFocus)
          elToFocus == null ? void 0 : elToFocus.select();
      }
    };
    const removeDocumentKeydown = () => window.document.removeEventListener("keydown", onDocumentKeydown);
    watch(() => props.shortcutListenerEnabled, (nV) => {
      if (nV) {
        window.document.addEventListener("keydown", onDocumentKeydown);
      } else {
        removeDocumentKeydown();
      }
    }, { immediate: true });
    onBeforeUnmount(() => {
      removeDocumentKeydown();
    });
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
    };
  }
});
const _hoisted_1 = /* @__PURE__ */ createElementVNode("i", { class: "search-icon search" }, null, -1);
const _hoisted_2 = ["value"];
const _hoisted_3 = /* @__PURE__ */ createElementVNode("i", {
  class: "search-icon shortcut",
  title: 'Press "/" to search'
}, null, -1);
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("div", normalizeProps(guardReactiveProps(_ctx.attrsStyles)), [
    renderSlot(_ctx.$slots, "prepend"),
    _ctx.searchIcon ? renderSlot(_ctx.$slots, "search-icon", { key: 0 }, () => [
      _hoisted_1
    ]) : createCommentVNode("", true),
    renderSlot(_ctx.$slots, "prepend-inner"),
    createElementVNode("input", mergeProps({
      ref: "inputRef",
      type: "search",
      "data-search-input": "true",
      value: _ctx.modelValue
    }, _ctx.attrsWithoutStyles, {
      onInput: _cache[0] || (_cache[0] = (...args) => _ctx.onInput && _ctx.onInput(...args)),
      onFocus: _cache[1] || (_cache[1] = ($event) => _ctx.hasFocus = true),
      onBlur: _cache[2] || (_cache[2] = ($event) => _ctx.hasFocus = false),
      onKeydown: _cache[3] || (_cache[3] = (...args) => _ctx.onKeydown && _ctx.onKeydown(...args))
    }), null, 16, _hoisted_2),
    renderSlot(_ctx.$slots, "append"),
    _ctx.showShortcutIcon ? renderSlot(_ctx.$slots, "shortcut-icon", { key: 1 }, () => [
      _hoisted_3
    ]) : createCommentVNode("", true),
    _ctx.showClearIcon ? renderSlot(_ctx.$slots, "clear-icon", {
      key: 2,
      clear: _ctx.clear
    }, () => [
      createElementVNode("button", {
        class: "search-icon clear",
        "aria-label": "Clear",
        onMousedown: _cache[4] || (_cache[4] = (...args) => _ctx.clear && _ctx.clear(...args)),
        onKeydown: _cache[5] || (_cache[5] = withKeys((...args) => _ctx.clear && _ctx.clear(...args), ["space", "enter"]))
      }, null, 32)
    ]) : createCommentVNode("", true),
    renderSlot(_ctx.$slots, "append-outer")
  ], 16);
}
var SearchInput = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render]]);
export { SearchInput as default };
