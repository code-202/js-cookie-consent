import * as React from 'react';
import { Store, TypeOptions } from './store';
import { ConsentResponse, ServiceInformations } from './service';
export interface Props {
    store: Store;
    type: TypeOptions;
}
export interface State {
}
declare class CustomizeType extends React.Component<Props, State> {
    render(): React.ReactNode;
    renderTypeName(): React.ReactNode;
    renderAcceptAll(): React.ReactNode;
    renderAcceptAllContent(choice: ConsentResponse): React.ReactNode;
    renderDeclineAll(): React.ReactNode;
    renderDeclineAllContent(choice: ConsentResponse): React.ReactNode;
    renderService(service: ServiceInformations): React.ReactNode;
    renderNoNeedConcent(): React.ReactNode;
}
declare const _default: typeof CustomizeType;
export default _default;
