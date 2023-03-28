import * as React from 'react';
import { Store } from './store';
import { ConsentResponse, ServiceInformations } from './service';
export interface Props {
    store: Store;
    service: ServiceInformations;
}
export interface State {
}
declare class CustomizeService extends React.Component<Props, State> {
    render(): React.ReactNode;
    renderServiceName(): React.ReactNode;
    renderAccept(): React.ReactNode;
    renderAcceptContent(choice: ConsentResponse): React.ReactNode;
    renderDecline(): React.ReactNode;
    renderDeclineContent(choice: ConsentResponse): React.ReactNode;
    renderNoNeedConcent(): React.ReactNode;
}
declare const _default: typeof CustomizeService;
export default _default;
