import * as React from 'react';
import { Store } from './store';
import { ServiceInformations } from './service';
interface BtnProps {
    color?: (service: ServiceInformations) => string;
    size?: (service: ServiceInformations) => string;
    outline?: (service: ServiceInformations) => boolean;
    className?: (service: ServiceInformations) => string;
    content?: (service: ServiceInformations) => React.ReactNode;
}
export interface Props {
    store: Store;
    service: ServiceInformations;
    className?: (service: ServiceInformations) => string;
    name?: (service: ServiceInformations) => React.ReactNode;
    accept?: BtnProps;
    decline?: BtnProps;
    noNeedConsent?: (service: ServiceInformations) => React.ReactNode;
}
export interface State {
}
declare class CustomizeService extends React.Component<Props, State> {
    render(): React.ReactNode;
}
declare const _default: typeof CustomizeService;
export default _default;
