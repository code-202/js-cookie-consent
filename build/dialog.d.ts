import * as React from 'react';
export interface Props {
}
export interface State {
}
declare class Dialog extends React.Component<Props, State> {
    private store;
    constructor(props: Props);
    render(): React.ReactNode;
    renderModalHeader(): React.ReactNode;
    renderModalBody(): React.ReactNode;
    renderButtonAcceptAll(): React.ReactNode;
    renderButtonDeclineAll(): React.ReactNode;
    renderButtonCustomize(): React.ReactNode;
    protected onDeclineClickHandler: () => void;
    protected onAcceptClickHandler: () => void;
    protected onCustomizeClickHandler: () => void;
}
declare const _default: typeof Dialog;
export default _default;
