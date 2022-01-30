(function(t,d){typeof exports=="object"&&typeof module!="undefined"?module.exports=d(require("vue")):typeof define=="function"&&define.amd?define(["vue"],d):(t=typeof globalThis!="undefined"?globalThis:t||self,t.VueSearchInput=d(t.Vue))})(this,function(t){"use strict";const d=["search","text"];var S=(e,n)=>{const c=e.__vccOpts||e;for(const[l,r]of n)c[l]=r;return c};const m=(e,n,c=!0)=>{const l={};return Object.keys(e).forEach(r=>{(c?n.indexOf(r)===-1:n.indexOf(r)>=0)&&(l[r]=e[r])}),l},a=(e=!0)=>({type:Boolean,default:e}),I=t.defineComponent({inheritAttrs:!1,props:{type:{type:String,default:"search",validator:e=>d.includes(e)},modelValue:{type:String,default:""},wrapperClass:{type:String,default:"search-input-wrapper"},searchIcon:a(),shortcutIcon:a(),clearIcon:a(),hideShortcutIconOnBlur:a(),clearOnEsc:a(),blurOnEsc:a(),selectOnFocus:a(),shortcutListenerEnabled:a(),shortcutKey:{type:String,default:"/"}},emits:["update:modelValue"],setup(e,{emit:n,attrs:c}){const l=t.ref(!1),r=t.ref(null),i=t.computed(()=>m(c,["class","style"])),s=t.computed(()=>{const o=m(c,["class","style"],!1);return o.class||(o.class=e.wrapperClass),o}),k=t.computed(()=>!!(e.clearIcon&&e.modelValue.length>0)),b=t.computed(()=>!!(e.shortcutIcon&&!l.value&&!e.hideShortcutIconOnBlur||e.shortcutIcon&&!l.value&&e.modelValue.length===0)),p=()=>{n("update:modelValue","")},C=o=>{n("update:modelValue",o.target.value)},K=o=>{o.key==="Escape"&&(e.clearOnEsc&&p(),e.blurOnEsc&&r.value.blur())},y=o=>{if(o.key===e.shortcutKey&&o.target!==r.value&&window.document.activeElement!==r.value&&!(o.target instanceof HTMLInputElement)&&!(o.target instanceof HTMLSelectElement)&&!(o.target instanceof HTMLTextAreaElement)){o.preventDefault();const f=[].slice.call(document.querySelectorAll('[data-search-input="true"]:not([data-shortcut-enabled="false"])')).filter(h=>!!(h.offsetWidth||h.offsetHeight||h.getClientRects().length)),u=f.length>1?f[0]:r.value;u==null||u.focus(),e.selectOnFocus&&(u==null||u.select())}},w=()=>window.document.removeEventListener("keydown",y);return t.watch(()=>e.shortcutListenerEnabled,o=>{o?window.document.addEventListener("keydown",y):w()},{immediate:!0}),t.onBeforeUnmount(()=>{w()}),{inputRef:r,hasFocus:l,clear:p,onInput:C,onKeydown:K,attrsStyles:s,attrsWithoutStyles:i,showClearIcon:k,showShortcutIcon:b}}}),E=t.createElementVNode("i",{class:"search-icon search"},null,-1),g=["data-shortcut-enabled","value"],V=t.createElementVNode("i",{class:"search-icon shortcut",title:'Press "/" to search'},null,-1);function O(e,n,c,l,r,i){return t.openBlock(),t.createElementBlock("div",t.normalizeProps(t.guardReactiveProps(e.attrsStyles)),[t.renderSlot(e.$slots,"prepend"),e.searchIcon?t.renderSlot(e.$slots,"search-icon",{key:0},()=>[E]):t.createCommentVNode("",!0),t.renderSlot(e.$slots,"prepend-inner"),t.createElementVNode("input",t.mergeProps({ref:"inputRef",type:"search","data-search-input":"true","data-shortcut-enabled":e.shortcutListenerEnabled,value:e.modelValue},e.attrsWithoutStyles,{onInput:n[0]||(n[0]=(...s)=>e.onInput&&e.onInput(...s)),onFocus:n[1]||(n[1]=s=>e.hasFocus=!0),onBlur:n[2]||(n[2]=s=>e.hasFocus=!1),onKeydown:n[3]||(n[3]=(...s)=>e.onKeydown&&e.onKeydown(...s))}),null,16,g),t.renderSlot(e.$slots,"append"),e.showShortcutIcon?t.renderSlot(e.$slots,"shortcut-icon",{key:1},()=>[V]):t.createCommentVNode("",!0),e.showClearIcon?t.renderSlot(e.$slots,"clear-icon",{key:2,clear:e.clear},()=>[t.createElementVNode("button",{class:"search-icon clear","aria-label":"Clear",onMousedown:n[4]||(n[4]=(...s)=>e.clear&&e.clear(...s)),onKeydown:n[5]||(n[5]=t.withKeys((...s)=>e.clear&&e.clear(...s),["space","enter"]))},null,32)]):t.createCommentVNode("",!0),t.renderSlot(e.$slots,"append-outer")],16)}var $=S(I,[["render",O]]);return $});
