import * as React from 'react';
import { Store, TypeOptions } from './store';
export interface Props {
}
export interface State {
}
declare class Customize extends React.Component<Props, State> {
    protected store: Store;
    constructor(props: Props);
    render(): React.ReactNode;
    renderType(type: TypeOptions): React.ReactNode;
}
declare const _default: typeof Customize;
export default _default;
