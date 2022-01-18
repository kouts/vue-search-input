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
} & {
    type: "search" | "text";
    modelValue: string;
} & {}> & {
    "onUpdate:modelValue"?: ((...args: any[]) => any) | undefined;
}, {
    type: "search" | "text";
    modelValue: string;
}>;
export default _default;
