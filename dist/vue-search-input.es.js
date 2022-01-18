import { defineComponent, ref, computed, onBeforeUnmount, openBlock, createElementBlock, normalizeProps, guardReactiveProps, renderSlot, createElementVNode, mergeProps, createCommentVNode } from "vue";
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
    }
  },
  emits: ["update:modelValue"],
  setup(props, { emit, attrs }) {
    const hasFocus = ref(false);
    const inputRef = ref(null);
    const attrsWithoutStyles = computed(() => filterObject(attrs, ["class", "style"]));
    const attrsStyles = computed(() => filterObject(attrs, ["class", "style"], false));
    const clear = () => {
      emit("update:modelValue", "");
    };
    const onInput = (e) => {
      emit("update:modelValue", e.target.value);
    };
    const onKeydown = (e) => {
      if (e.key === "Escape") {
        clear();
        const el = inputRef.value;
        el.blur();
      }
    };
    const onDocumentKeydown = (e) => {
      if (e.key === "/" && e.target !== inputRef.value && window.document.activeElement !== inputRef.value && e.target instanceof HTMLInputElement === false && e.target instanceof HTMLSelectElement === false && e.target instanceof HTMLTextAreaElement === false) {
        e.preventDefault();
        const allVisibleSearchInputs = [].slice.call(document.querySelectorAll("[data-search-bar-input]")).filter((el) => {
          return !!(el.offsetWidth || el.offsetHeight || el.getClientRects().length);
        });
        const elToFocus = allVisibleSearchInputs.length > 1 ? allVisibleSearchInputs[0] : inputRef.value;
        elToFocus == null ? void 0 : elToFocus.focus();
        elToFocus == null ? void 0 : elToFocus.select();
      }
    };
    window.document.addEventListener("keydown", onDocumentKeydown);
    onBeforeUnmount(() => {
      window.document.removeEventListener("keydown", onDocumentKeydown);
    });
    return {
      inputRef,
      hasFocus,
      clear,
      onInput,
      onKeydown,
      attrsStyles,
      attrsWithoutStyles
    };
  }
});
const _hoisted_1 = /* @__PURE__ */ createElementVNode("div", { class: "search-icon search" }, [
  /* @__PURE__ */ createElementVNode("svg", {
    width: "20",
    height: "20",
    viewBox: "0 0 24 24",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg"
  }, [
    /* @__PURE__ */ createElementVNode("path", {
      "fill-rule": "evenodd",
      "clip-rule": "evenodd",
      d: "M18.319 14.4326C20.7628 11.2941 20.542 6.75347 17.6569 3.86829C14.5327 0.744098 9.46734 0.744098 6.34315 3.86829C3.21895 6.99249 3.21895 12.0578 6.34315 15.182C9.22833 18.0672 13.769 18.2879 16.9075 15.8442C16.921 15.8595 16.9351 15.8745 16.9497 15.8891L21.1924 20.1317C21.5829 20.5223 22.2161 20.5223 22.6066 20.1317C22.9971 19.7412 22.9971 19.1081 22.6066 18.7175L18.364 14.4749C18.3493 14.4603 18.3343 14.4462 18.319 14.4326ZM16.2426 5.28251C18.5858 7.62565 18.5858 11.4246 16.2426 13.7678C13.8995 16.1109 10.1005 16.1109 7.75736 13.7678C5.41421 11.4246 5.41421 7.62565 7.75736 5.28251C10.1005 2.93936 13.8995 2.93936 16.2426 5.28251Z",
      fill: "currentColor"
    })
  ])
], -1);
const _hoisted_2 = ["value"];
const _hoisted_3 = /* @__PURE__ */ createElementVNode("div", {
  class: "search-icon shortcut",
  title: 'Press "/" to search'
}, [
  /* @__PURE__ */ createElementVNode("svg", {
    width: "16",
    height: "20",
    viewBox: "4 4 14 14",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg"
  }, [
    /* @__PURE__ */ createElementVNode("path", {
      "fill-rule": "evenodd",
      "clip-rule": "evenodd",
      d: "M14.526 6.10576C15.0265 6.33917 15.2667 6.88343 15.0625 7.3214L9.88541 18.4237C9.68118 18.8616 9.10985 19.0275 8.60931 18.7941C8.10877 18.5607 7.86857 18.0164 8.0728 17.5784L13.2499 6.47616C13.4541 6.03819 14.0254 5.87235 14.526 6.10576Z",
      fill: "currentColor"
    })
  ])
], -1);
const _hoisted_4 = /* @__PURE__ */ createElementVNode("svg", {
  width: "18",
  height: "18",
  viewBox: "0 0 24 24",
  fill: "none",
  xmlns: "http://www.w3.org/2000/svg"
}, [
  /* @__PURE__ */ createElementVNode("path", {
    d: "M6.2253 4.81108C5.83477 4.42056 5.20161 4.42056 4.81108 4.81108C4.42056 5.20161 4.42056 5.83477 4.81108 6.2253L10.5858 12L4.81114 17.7747C4.42062 18.1652 4.42062 18.7984 4.81114 19.1889C5.20167 19.5794 5.83483 19.5794 6.22535 19.1889L12 13.4142L17.7747 19.1889C18.1652 19.5794 18.7984 19.5794 19.1889 19.1889C19.5794 18.7984 19.5794 18.1652 19.1889 17.7747L13.4142 12L19.189 6.2253C19.5795 5.83477 19.5795 5.20161 19.189 4.81108C18.7985 4.42056 18.1653 4.42056 17.7748 4.81108L12 10.5858L6.2253 4.81108Z",
    fill: "currentColor"
  })
], -1);
const _hoisted_5 = [
  _hoisted_4
];
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("div", normalizeProps(guardReactiveProps(_ctx.attrsStyles)), [
    renderSlot(_ctx.$slots, "search-icon", {}, () => [
      _hoisted_1
    ]),
    createElementVNode("input", mergeProps({
      ref: "inputRef",
      type: "search",
      class: "search-input",
      "data-search-input": "true",
      value: _ctx.modelValue
    }, _ctx.attrsWithoutStyles, {
      onInput: _cache[0] || (_cache[0] = (...args) => _ctx.onInput && _ctx.onInput(...args)),
      onFocus: _cache[1] || (_cache[1] = ($event) => _ctx.hasFocus = true),
      onBlur: _cache[2] || (_cache[2] = ($event) => _ctx.hasFocus = false),
      onKeydown: _cache[3] || (_cache[3] = (...args) => _ctx.onKeydown && _ctx.onKeydown(...args))
    }), null, 16, _hoisted_2),
    !_ctx.hasFocus && _ctx.modelValue.length === 0 ? renderSlot(_ctx.$slots, "shortcut-icon", { key: 0 }, () => [
      _hoisted_3
    ]) : createCommentVNode("", true),
    _ctx.modelValue.length > 0 ? renderSlot(_ctx.$slots, "clear-icon", {
      key: 1,
      clear: _ctx.clear
    }, () => [
      createElementVNode("div", {
        class: "search-icon clear",
        onMousedown: _cache[4] || (_cache[4] = (...args) => _ctx.clear && _ctx.clear(...args))
      }, _hoisted_5, 32)
    ]) : createCommentVNode("", true)
  ], 16);
}
var SearchInput = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render]]);
export { SearchInput as default };
