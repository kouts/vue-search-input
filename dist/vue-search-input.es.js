import { defineComponent as k, ref as I, computed as i, watch as b, onBeforeUnmount as K, openBlock as V, createElementBlock as B, normalizeProps as C, guardReactiveProps as L, renderSlot as u, createCommentVNode as y, createElementVNode as d, mergeProps as H, withKeys as M } from "vue";
const P = ["search", "text"], g = (e, t, l = !0) => {
  const r = {};
  return Object.keys(e).forEach((o) => {
    (l ? t.indexOf(o) === -1 : t.indexOf(o) >= 0) && (r[o] = e[o]);
  }), r;
}, a = (e = !0) => ({ type: Boolean, default: e }), R = k({
  inheritAttrs: !1,
  props: {
    type: {
      type: String,
      default: "search",
      validator: (e) => P.includes(e)
    },
    modelValue: {
      type: String,
      default: ""
    },
    wrapperClass: {
      type: String,
      default: "search-input-wrapper"
    },
    searchIcon: a(),
    shortcutIcon: a(),
    clearIcon: a(),
    hideShortcutIconOnBlur: a(),
    clearOnEsc: a(),
    blurOnEsc: a(),
    selectOnFocus: a(),
    shortcutListenerEnabled: a(),
    shortcutKey: {
      type: String,
      default: "/"
    }
  },
  emits: ["update:modelValue"],
  setup(e, { emit: t, attrs: l }) {
    const r = I(!1), o = I(null), f = i(() => g(l, ["class", "style"])), s = i(() => {
      const n = g(l, ["class", "style"], !1);
      return n.class || (n.class = e.wrapperClass), n;
    }), E = i(() => !!(e.clearIcon && e.modelValue.length > 0)), S = i(() => !!(e.shortcutIcon && !r.value && !e.hideShortcutIconOnBlur || e.shortcutIcon && !r.value && e.modelValue.length === 0)), m = () => {
      t("update:modelValue", "");
    }, O = (n) => {
      t("update:modelValue", n.target.value);
    }, $ = (n) => {
      n.key === "Escape" && (e.clearOnEsc && m(), e.blurOnEsc && o.value.blur());
    }, w = (n) => {
      if (n.key === e.shortcutKey && n.target !== o.value && window.document.activeElement !== o.value && !(n.target instanceof HTMLInputElement) && !(n.target instanceof HTMLSelectElement) && !(n.target instanceof HTMLTextAreaElement)) {
        n.preventDefault();
        const h = [].slice.call(document.querySelectorAll('[data-search-input="true"]:not([data-shortcut-enabled="false"])')).filter((p) => !!(p.offsetWidth || p.offsetHeight || p.getClientRects().length)), c = h.length > 1 ? h[0] : o.value;
        c == null || c.focus(), e.selectOnFocus && (c == null || c.select());
      }
    }, v = () => window.document.removeEventListener("keydown", w);
    return b(
      () => e.shortcutListenerEnabled,
      (n) => {
        n ? window.document.addEventListener("keydown", w) : v();
      },
      { immediate: !0 }
    ), K(() => {
      v();
    }), {
      inputRef: o,
      hasFocus: r,
      clear: m,
      onInput: O,
      onKeydown: $,
      attrsStyles: s,
      attrsWithoutStyles: f,
      showClearIcon: E,
      showShortcutIcon: S
    };
  }
}), D = (e, t) => {
  const l = e.__vccOpts || e;
  for (const [r, o] of t)
    l[r] = o;
  return l;
}, F = /* @__PURE__ */ d("i", { class: "search-icon search" }, null, -1), W = ["data-shortcut-enabled", "value"], N = /* @__PURE__ */ d("i", {
  class: "search-icon shortcut",
  title: 'Press "/" to search'
}, null, -1);
function T(e, t, l, r, o, f) {
  return V(), B("div", C(L(e.attrsStyles)), [
    u(e.$slots, "prepend"),
    e.searchIcon ? u(e.$slots, "search-icon", { key: 0 }, () => [
      F
    ]) : y("", !0),
    u(e.$slots, "prepend-inner"),
    d("input", H({
      ref: "inputRef",
      type: "search",
      "data-search-input": "true",
      "data-shortcut-enabled": e.shortcutListenerEnabled,
      value: e.modelValue
    }, e.attrsWithoutStyles, {
      onInput: t[0] || (t[0] = (...s) => e.onInput && e.onInput(...s)),
      onFocus: t[1] || (t[1] = (s) => e.hasFocus = !0),
      onBlur: t[2] || (t[2] = (s) => e.hasFocus = !1),
      onKeydown: t[3] || (t[3] = (...s) => e.onKeydown && e.onKeydown(...s))
    }), null, 16, W),
    u(e.$slots, "append"),
    e.showShortcutIcon ? u(e.$slots, "shortcut-icon", { key: 1 }, () => [
      N
    ]) : y("", !0),
    e.showClearIcon ? u(e.$slots, "clear-icon", {
      key: 2,
      clear: e.clear
    }, () => [
      d("button", {
        class: "search-icon clear",
        "aria-label": "Clear",
        onMousedown: t[4] || (t[4] = (...s) => e.clear && e.clear(...s)),
        onKeydown: t[5] || (t[5] = M((...s) => e.clear && e.clear(...s), ["space", "enter"]))
      }, null, 32)
    ]) : y("", !0),
    u(e.$slots, "append-outer")
  ], 16);
}
const z = /* @__PURE__ */ D(R, [["render", T]]);
export {
  z as default
};
