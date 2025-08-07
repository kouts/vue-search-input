import { defineComponent as k, ref as I, computed as c, watch as b, onBeforeUnmount as K, createElementBlock as V, openBlock as B, normalizeProps as C, guardReactiveProps as L, renderSlot as u, createCommentVNode as p, createElementVNode as i, mergeProps as F, withKeys as T } from "vue";
const g = (e, t, r = !0) => {
  const l = {};
  return Object.keys(e).forEach((o) => {
    (r ? t.indexOf(o) === -1 : t.indexOf(o) >= 0) && (l[o] = e[o]);
  }), l;
}, H = ["search", "text", "password"], a = (e = !0) => ({ type: Boolean, default: e }), M = k({
  name: "SearchInput",
  inheritAttrs: !1,
  props: {
    type: {
      type: String,
      default: "search",
      validator: (e) => H.includes(e)
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
  setup(e, { emit: t, attrs: r }) {
    const l = I(!1), o = I(null), d = c(() => g(r, ["class", "style"])), s = c(() => {
      const n = g(r, ["class", "style"], !1);
      return n.class || (n.class = e.wrapperClass), n;
    }), S = c(() => !!(e.clearIcon && e.modelValue.length > 0)), E = c(() => !!(e.shortcutIcon && !l.value && !e.hideShortcutIconOnBlur || e.shortcutIcon && !l.value && e.modelValue.length === 0)), y = () => {
      t("update:modelValue", "");
    }, O = (n) => {
      t("update:modelValue", n.target.value);
    }, $ = (n) => {
      n.key === "Escape" && (e.clearOnEsc && y(), e.blurOnEsc && o.value.blur());
    }, m = (n) => {
      if (n.key === e.shortcutKey && n.target !== o.value && window.document.activeElement !== o.value && !(n.target instanceof HTMLInputElement) && !(n.target instanceof HTMLSelectElement) && !(n.target instanceof HTMLTextAreaElement)) {
        n.preventDefault();
        const f = [].slice.call(document.querySelectorAll('[data-search-input="true"]:not([data-shortcut-enabled="false"])')).filter((h) => !!(h.offsetWidth || h.offsetHeight || h.getClientRects().length)), v = f.length > 1 ? f[0] : o.value;
        v?.focus(), e.selectOnFocus && v?.select();
      }
    }, w = () => window.document.removeEventListener("keydown", m);
    return b(
      () => e.shortcutListenerEnabled,
      (n) => {
        n ? window.document.addEventListener("keydown", m) : w();
      },
      { immediate: !0 }
    ), K(() => {
      w();
    }), {
      inputRef: o,
      hasFocus: l,
      clear: y,
      onInput: O,
      onKeydown: $,
      attrsStyles: s,
      attrsWithoutStyles: d,
      showClearIcon: S,
      showShortcutIcon: E
    };
  }
}), P = (e, t) => {
  const r = e.__vccOpts || e;
  for (const [l, o] of t)
    r[l] = o;
  return r;
}, R = ["type", "data-shortcut-enabled", "value"];
function D(e, t, r, l, o, d) {
  return B(), V("div", C(L(e.attrsStyles)), [
    u(e.$slots, "prepend"),
    e.searchIcon ? u(e.$slots, "search-icon", { key: 0 }, () => [
      t[6] || (t[6] = i("i", { class: "search-icon search" }, null, -1))
    ]) : p("", !0),
    u(e.$slots, "prepend-inner"),
    i("input", F({
      ref: "inputRef",
      type: e.type,
      "data-search-input": "true",
      "data-shortcut-enabled": e.shortcutListenerEnabled,
      value: e.modelValue
    }, e.attrsWithoutStyles, {
      onInput: t[0] || (t[0] = (...s) => e.onInput && e.onInput(...s)),
      onFocus: t[1] || (t[1] = (s) => e.hasFocus = !0),
      onBlur: t[2] || (t[2] = (s) => e.hasFocus = !1),
      onKeydown: t[3] || (t[3] = (...s) => e.onKeydown && e.onKeydown(...s))
    }), null, 16, R),
    u(e.$slots, "append"),
    e.showShortcutIcon ? u(e.$slots, "shortcut-icon", { key: 1 }, () => [
      t[7] || (t[7] = i("i", {
        class: "search-icon shortcut",
        title: 'Press "/" to search'
      }, null, -1))
    ]) : p("", !0),
    e.showClearIcon ? u(e.$slots, "clear-icon", {
      key: 2,
      clear: e.clear
    }, () => [
      i("button", {
        class: "search-icon clear",
        "aria-label": "Clear",
        onMousedown: t[4] || (t[4] = (...s) => e.clear && e.clear(...s)),
        onKeydown: t[5] || (t[5] = T((...s) => e.clear && e.clear(...s), ["space", "enter"]))
      }, null, 32)
    ]) : p("", !0),
    u(e.$slots, "append-outer")
  ], 16);
}
const N = /* @__PURE__ */ P(M, [["render", D]]);
export {
  N as default
};
