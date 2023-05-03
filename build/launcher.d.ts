import * as React from 'react';
import { Store } from './store';
export interface Props {
    storeId?: string;
    className?: string;
    content?: (store: Store) => React.ReactNode;
    alwaysShown?: boolean;
}
export interface State {
}
export declare class Launcher extends React.Component<Props, State> {
    protected store: Store;
    constructor(props: Props);
    render(): React.ReactNode;
}
declare const _default: typeof Launcher;
export default _default;
