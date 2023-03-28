import * as React from 'react';
import { Store } from './store';
export interface Props {
    className?: string;
    alwaysShown?: boolean;
}
export interface State {
}
export declare class Launcher extends React.Component<Props, State> {
    protected store: Store;
    constructor(props: Props);
    render(): React.ReactNode;
    renderContent(): React.ReactNode;
}
declare const _default: typeof Launcher;
export default _default;
