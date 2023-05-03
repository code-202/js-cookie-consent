import * as React from 'react';
import { Store } from './store';
import { Props as CustomizeProps } from './customize';
interface BtnProps {
    color?: string;
    size?: string;
    outline?: boolean;
    className?: string;
    content?: (store: Store) => React.ReactNode;
}
export interface Props {
    storeId?: string;
    className?: string;
    header?: {
        className: string;
        content: (store: Store) => React.ReactNode;
    };
    body?: {
        className?: string;
        content?: (store: Store, customize: React.ReactNode) => React.ReactNode;
    };
    footer?: {
        className?: string;
        collapse?: {
            className?: string;
            contentClassName?: string;
        };
        acceptAll?: BtnProps;
        declineAll?: BtnProps;
        customize?: BtnProps;
        close?: BtnProps;
    };
    customize?: CustomizeProps;
}
export interface State {
}
declare class Dialog extends React.Component<Props, State> {
    protected store: Store;
    constructor(props: Props);
    render(): React.ReactNode;
    protected onDeclineClickHandler: () => void;
    protected onAcceptClickHandler: () => void;
    protected onCustomizeClickHandler: () => void;
    protected onCloseClickHandler: () => void;
}
declare const _default: typeof Dialog;
export default _default;
