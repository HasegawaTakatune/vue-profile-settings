import type BaseAction from "@/components/ts/BaseAction";

export default interface Action {
    key: string;
    id: string;
    label: string;
    action: BaseAction;
    disabled: boolean;
}