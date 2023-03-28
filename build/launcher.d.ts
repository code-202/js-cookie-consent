import * as React from 'react';
export interface Props {
    className?: string;
}
export interface State {
}
export declare class Launcher extends React.Component<Props, State> {
    private store;
    constructor(props: Props);
    render(): React.ReactNode;
    renderContent(): React.ReactNode;
}
declare const _default: typeof Launcher;
export default _default;
