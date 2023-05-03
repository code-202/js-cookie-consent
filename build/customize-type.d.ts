import * as React from 'react';
import { Store, TypeOptions } from './store';
import { Props as CustomizeServiceProps } from './customize-service';
interface BtnProps {
    color?: (type: TypeOptions) => string;
    size?: (type: TypeOptions) => string;
    outline?: (type: TypeOptions) => boolean;
    className?: (type: TypeOptions) => string;
    content?: (type: TypeOptions) => React.ReactNode;
}
export interface Props {
    store: Store;
    type: TypeOptions;
    className?: (type: TypeOptions) => string;
    name?: {
        btn?: BtnProps;
        content?: (type: TypeOptions) => React.ReactNode;
    };
    acceptAll?: BtnProps;
    declineAll?: BtnProps;
    noNeedConsent?: (type: TypeOptions) => React.ReactNode;
    service?: Omit<CustomizeServiceProps, 'service' | 'store'>;
}
export interface State {
}
declare class CustomizeType extends React.Component<Props, State> {
    render(): React.ReactNode;
}
declare const _default: typeof CustomizeType;
export default _default;
