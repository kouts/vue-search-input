import { PropType } from 'vue';
import { FieldType } from './SearchInput.types';
declare const _default: import("vue").DefineComponent<{
    type: {
        type: PropType<"search" | "text">;
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
    shortcutKey: {
        type: PropType<string>;
        default: string;
    };
}, {
    inputRef: import("vue").Ref<HTMLInputElement | null>;
    hasFocus: import("vue").Ref<boolean>;
    clear: () => void;
    onInput: (e: Event) => void;
    onKeydown: (e: KeyboardEvent) => void;
    attrsStyles: import("vue").ComputedRef<{
        [key: string]: unknown;
    }>;
    attrsWithoutStyles: import("vue").ComputedRef<{
        [key: string]: unknown;
    }>;
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, "update:modelValue"[], "update:modelValue", import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<{
    type?: unknown;
    modelValue?: unknown;
    wrapperClass?: unknown;
    searchIcon?: unknown;
    shortcutIcon?: unknown;
    clearIcon?: unknown;
    clearOnEsc?: unknown;
    blurOnEsc?: unknown;
    selectOnFocus?: unknown;
    shortcutKey?: unknown;
} & {
    type: "search" | "text";
    modelValue: string;
    wrapperClass: string;
    searchIcon: boolean;
    shortcutIcon: boolean;
    clearIcon: boolean;
    clearOnEsc: boolean;
    blurOnEsc: boolean;
    selectOnFocus: boolean;
    shortcutKey: string;
} & {}> & {
    "onUpdate:modelValue"?: ((...args: any[]) => any) | undefined;
}, {
    type: "search" | "text";
    modelValue: string;
    wrapperClass: string;
    searchIcon: boolean;
    shortcutIcon: boolean;
    clearIcon: boolean;
    clearOnEsc: boolean;
    blurOnEsc: boolean;
    selectOnFocus: boolean;
    shortcutKey: string;
}>;
export default _default;
