import * as React from 'react'
import { observer } from 'mobx-react'
import { Store } from './store'
import { Button } from 'reactstrap'
import { ConsentResponse, ServiceInformations } from './service'

interface BtnProps {
    color?: (service: ServiceInformations) => string
    size?: (service: ServiceInformations) => string
    outline?: (service: ServiceInformations) => boolean
    className?: (service: ServiceInformations) => string
    content?: (service: ServiceInformations) => React.ReactNode
}

export interface Props {
    store: Store
    service: ServiceInformations
    className?: (service: ServiceInformations) => string
    name?: (service: ServiceInformations) => React.ReactNode
    acceptAll?: BtnProps
    declineAll?: BtnProps
    noNeedConsent?: (service: ServiceInformations) => React.ReactNode
}

export interface State {

}

class CustomizeService extends React.Component<Props, State> {
    render (): React.ReactNode {

        const { store, service, className, name, acceptAll, declineAll, noNeedConsent } = this.props

        return <>
            <div className={className !== undefined ? className(service) : 'd-flex justify-content-between' }>
                { name !== undefined ? name(service) : <span>{ service.id } ({service.cookies?.join(', ')})</span> }
                <div>
                    { service.needConsent ? (
                        <>
                            <Button
                                color={acceptAll?.color !== undefined ? acceptAll.color(service) : 'primary'}
                                size={acceptAll?.size?.(service)}
                                outline={acceptAll?.outline !== undefined ? acceptAll.outline(service) : service.consent != 'yes'}
                                className={acceptAll?.className !== undefined ? acceptAll.className(service) : '' }
                                onClick={() => store.accept(service.id)}
                                >
                                {acceptAll?.content !== undefined ? acceptAll.content(service) : 'Accept'}
                            </Button>
                            <Button
                                color={declineAll?.color !== undefined ? declineAll.color(service) : 'primary'}
                                size={declineAll?.size?.(service)}
                                outline={declineAll?.outline !== undefined ? declineAll.outline(service) : service.consent != 'no'}
                                className={declineAll?.className !== undefined ? declineAll.className(service) : 'ms-2' }
                                onClick={() => store.decline(service.id)}
                                >
                                {declineAll?.content !== undefined ? declineAll.content(service) : 'Decline'}
                            </Button>
                        </>
                    ) : (
                        noNeedConsent !== undefined ? noNeedConsent(service) : 'Required'
                    )}
                </div>
            </div>
        </>
    }
}

export default observer(CustomizeService)
