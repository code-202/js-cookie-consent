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
    accept?: BtnProps
    decline?: BtnProps
    noNeedConsent?: (service: ServiceInformations) => React.ReactNode
}

export interface State {

}

class CustomizeService extends React.Component<Props, State> {
    render (): React.ReactNode {

        const { store, service, className, name, accept, decline, noNeedConsent } = this.props

        return <>
            <div className={className !== undefined ? className(service) : 'd-flex justify-content-between' }>
                { name !== undefined ? name(service) : <span>{ service.id } ({service.cookies?.join(', ')})</span> }
                <div>
                    { service.needConsent ? (
                        <>
                            <Button
                                color={accept?.color !== undefined ? accept.color(service) : 'primary'}
                                size={accept?.size?.(service)}
                                outline={accept?.outline !== undefined ? accept.outline(service) : service.consent != 'yes'}
                                className={accept?.className !== undefined ? accept.className(service) : '' }
                                onClick={() => store.accept(service.id)}
                                >
                                {accept?.content !== undefined ? accept.content(service) : 'Accept'}
                            </Button>
                            <Button
                                color={decline?.color !== undefined ? decline.color(service) : 'primary'}
                                size={decline?.size?.(service)}
                                outline={decline?.outline !== undefined ? decline.outline(service) : service.consent != 'no'}
                                className={decline?.className !== undefined ? decline.className(service) : 'ms-2' }
                                onClick={() => store.decline(service.id)}
                                >
                                {decline?.content !== undefined ? decline.content(service) : 'Decline'}
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
