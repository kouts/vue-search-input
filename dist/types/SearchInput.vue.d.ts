import { PropType } from 'vue';
import { FieldType } from './SearchInput.types';
declare const _default: import('vue').DefineComponent<import('vue').ExtractPropTypes<{
    type: {
        type: PropType<FieldType>;
        default: string;
        validator: (prop: FieldType) => boolean;
    };
    modelValue: {
        type: StringConstructor;
        default: string;
    };
    wrapperClass: {
        type: StringConstructor;
        default: string;
    };
    searchIcon: {
        type: BooleanConstructor;
        default: boolean;
    };
    shortcutIcon: {
        type: BooleanConstructor;
        default: boolean;
    };
    clearIcon: {
        type: BooleanConstructor;
        default: boolean;
    };
    hideShortcutIconOnBlur: {
        type: BooleanConstructor;
        default: boolean;
    };
    clearOnEsc: {
        type: BooleanConstructor;
        default: boolean;
    };
    blurOnEsc: {
        type: BooleanConstructor;
        default: boolean;
    };
    selectOnFocus: {
        type: BooleanConstructor;
        default: boolean;
    };
    shortcutListenerEnabled: {
        type: BooleanConstructor;
        default: boolean;
    };
    shortcutKey: {
        type: PropType<KeyboardEvent["key"]>;
        default: string;
    };
}>, {
    inputRef: import('vue').Ref<HTMLInputElement | null, HTMLInputElement | null>;
    hasFocus: import('vue').Ref<boolean, boolean>;
    clear: () => void;
    clearAndFocus: () => void;
    onInput: (e: Event) => void;
    onKeydown: (e: KeyboardEvent) => void;
    attrsStyles: import('vue').ComputedRef<{
        [key: string]: unknown;
    }>;
    attrsWithoutStyles: import('vue').ComputedRef<{
        [key: string]: unknown;
    }>;
    showClearIcon: import('vue').ComputedRef<boolean>;
    showShortcutIcon: import('vue').ComputedRef<boolean>;
}, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, ("update:modelValue" | "click:search" | "click:clear")[], "update:modelValue" | "click:search" | "click:clear", import('vue').PublicProps, Readonly<import('vue').ExtractPropTypes<{
    type: {
        type: PropType<FieldType>;
        default: string;
        validator: (prop: FieldType) => boolean;
    };
    modelValue: {
        type: StringConstructor;
        default: string;
    };
    wrapperClass: {
        type: StringConstructor;
        default: string;
    };
    searchIcon: {
        type: BooleanConstructor;
        default: boolean;
    };
    shortcutIcon: {
        type: BooleanConstructor;
        default: boolean;
    };
    clearIcon: {
        type: BooleanConstructor;
        default: boolean;
    };
    hideShortcutIconOnBlur: {
        type: BooleanConstructor;
        default: boolean;
    };
    clearOnEsc: {
        type: BooleanConstructor;
        default: boolean;
    };
    blurOnEsc: {
        type: BooleanConstructor;
        default: boolean;
    };
    selectOnFocus: {
        type: BooleanConstructor;
        default: boolean;
    };
    shortcutListenerEnabled: {
        type: BooleanConstructor;
        default: boolean;
    };
    shortcutKey: {
        type: PropType<KeyboardEvent["key"]>;
        default: string;
    };
}>> & Readonly<{
    "onUpdate:modelValue"?: ((...args: any[]) => any) | undefined;
    "onClick:search"?: ((...args: any[]) => any) | undefined;
    "onClick:clear"?: ((...args: any[]) => any) | undefined;
}>, {
    type: "search" | "text" | "password";
    modelValue: string;
    wrapperClass: string;
    searchIcon: boolean;
    shortcutIcon: boolean;
    clearIcon: boolean;
    hideShortcutIconOnBlur: boolean;
    clearOnEsc: boolean;
    blurOnEsc: boolean;
    selectOnFocus: boolean;
    shortcutListenerEnabled: boolean;
    shortcutKey: string;
}, {}, {}, {}, string, import('vue').ComponentProvideOptions, true, {}, any>;
export default _default;
