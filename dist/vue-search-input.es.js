import { defineComponent as b, ref as I, computed as c, watch as K, onBeforeUnmount as V, nextTick as C, createElementBlock as B, openBlock as L, normalizeProps as T, guardReactiveProps as A, renderSlot as u, createCommentVNode as y, createElementVNode as i, mergeProps as M, withKeys as H, withModifiers as g } from "vue";
const S = (e, t, r = !0) => {
  const l = {};
  return Object.keys(e).forEach((o) => {
    (r ? t.indexOf(o) === -1 : t.indexOf(o) >= 0) && (l[o] = e[o]);
  }), l;
}, P = ["search", "text", "password"], a = (e = !0) => ({ type: Boolean, default: e }), R = b({
  name: "SearchInput",
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
  emits: ["update:modelValue", "click:search", "click:clear"],
  setup(e, { emit: t, attrs: r }) {
    const l = I(!1), o = I(null), d = c(() => S(r, ["class", "style"])), s = c(() => {
      const n = S(r, ["class", "style"], !1);
      return n.class || (n.class = e.wrapperClass), n;
    }), k = c(() => !!(e.clearIcon && e.modelValue.length > 0)), E = c(() => !!(e.shortcutIcon && !l.value && !e.hideShortcutIconOnBlur || e.shortcutIcon && !l.value && e.modelValue.length === 0)), f = () => {
      t("update:modelValue", ""), t("click:clear");
    }, $ = () => {
      f(), C(() => {
        o.value?.focus();
      });
    }, O = (n) => {
      t("update:modelValue", n.target.value);
    }, F = (n) => {
      n.key === "Escape" && (e.clearOnEsc && f(), e.blurOnEsc && o.value.blur());
    }, m = (n) => {
      if (n.key === e.shortcutKey && n.target !== o.value && window.document.activeElement !== o.value && !(n.target instanceof HTMLInputElement) && !(n.target instanceof HTMLSelectElement) && !(n.target instanceof HTMLTextAreaElement)) {
        n.preventDefault();
        const h = [].slice.call(document.querySelectorAll('[data-search-input="true"]:not([data-shortcut-enabled="false"])')).filter((p) => !!(p.offsetWidth || p.offsetHeight || p.getClientRects().length)), v = h.length > 1 ? h[0] : o.value;
        v?.focus(), e.selectOnFocus && v?.select();
      }
    }, w = () => window.document.removeEventListener("keydown", m);
    return K(
      () => e.shortcutListenerEnabled,
      (n) => {
        n ? window.document.addEventListener("keydown", m) : w();
      },
      { immediate: !0 }
    ), V(() => {
      w();
    }), {
      inputRef: o,
      hasFocus: l,
      clear: f,
      clearAndFocus: $,
      onInput: O,
      onKeydown: F,
      attrsStyles: s,
      attrsWithoutStyles: d,
      showClearIcon: k,
      showShortcutIcon: E
    };
  }
}), D = (e, t) => {
  const r = e.__vccOpts || e;
  for (const [l, o] of t)
    r[l] = o;
  return r;
}, W = ["type", "data-shortcut-enabled", "value"];
function N(e, t, r, l, o, d) {
  return L(), B("div", T(A(e.attrsStyles)), [
    u(e.$slots, "prepend"),
    e.searchIcon ? u(e.$slots, "search-icon", { key: 0 }, () => [
      i("i", {
        class: "search-icon search",
        onClick: t[0] || (t[0] = (s) => e.$emit("click:search"))
      })
    ]) : y("", !0),
    u(e.$slots, "prepend-inner"),
    i("input", M({
      ref: "inputRef",
      type: e.type,
      "data-search-input": "true",
      "data-shortcut-enabled": e.shortcutListenerEnabled,
      value: e.modelValue
    }, e.attrsWithoutStyles, {
      onInput: t[1] || (t[1] = (...s) => e.onInput && e.onInput(...s)),
      onFocus: t[2] || (t[2] = (s) => e.hasFocus = !0),
      onBlur: t[3] || (t[3] = (s) => e.hasFocus = !1),
      onKeydown: t[4] || (t[4] = (...s) => e.onKeydown && e.onKeydown(...s))
    }), null, 16, W),
    u(e.$slots, "append"),
    e.showShortcutIcon ? u(e.$slots, "shortcut-icon", { key: 1 }, () => [
      t[7] || (t[7] = i("i", {
        class: "search-icon shortcut",
        title: 'Press "/" to search'
      }, null, -1))
    ]) : y("", !0),
    e.showClearIcon ? u(e.$slots, "clear-icon", {
      key: 2,
      clear: e.clear
    }, () => [
      i("button", {
        class: "search-icon clear",
        "aria-label": "Clear",
        onMousedown: t[5] || (t[5] = g((...s) => e.clearAndFocus && e.clearAndFocus(...s), ["prevent"])),
        onKeydown: t[6] || (t[6] = H(g((...s) => e.clearAndFocus && e.clearAndFocus(...s), ["prevent"]), ["space", "enter"]))
      }, null, 32)
    ]) : y("", !0),
    u(e.$slots, "append-outer")
  ], 16);
}
const z = /* @__PURE__ */ D(R, [["render", N]]);
export {
  z as default
};
