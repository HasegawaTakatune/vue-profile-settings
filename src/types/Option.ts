import type BaseAction from "@/components/ts/BaseAction";

export default interface Option {
    id: string;
    label: string;
    action: BaseAction;
    disabled: boolean;
}