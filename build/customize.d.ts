import * as React from 'react';
import { Store } from './store';
import { Props as CustomizeTypeProps } from './customize-type';
export interface Props {
    type?: Omit<CustomizeTypeProps, 'type' | 'store'>;
}
export interface State {
}
declare class Customize extends React.Component<Props, State> {
    protected store: Store;
    constructor(props: Props);
    render(): React.ReactNode;
}
declare const _default: typeof Customize;
export default _default;
