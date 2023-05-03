import * as React from 'react'
import { observer } from 'mobx-react'
import { Store, TypeOptions } from './store'
import { Button, Collapse, ListGroup } from 'reactstrap'
import { ConsentResponse, ServiceInformations } from './service'
import CustomizeService, { Props as CustomizeServiceProps } from './customize-service'

interface BtnProps {
    color?: (type: TypeOptions) => string
    size?: (type: TypeOptions) => string
    outline?: (type: TypeOptions) => boolean
    className?: (type: TypeOptions) => string
    content?: (type: TypeOptions) => React.ReactNode
}

export interface Props {
    store: Store
    type: TypeOptions
    className?: (type: TypeOptions) => string
    name?: {
        btn?: BtnProps
        content?: (type: TypeOptions) => React.ReactNode
    }
    acceptAll?: BtnProps
    declineAll?: BtnProps
    noNeedConsent?: (type: TypeOptions) => React.ReactNode
    service?: Omit<CustomizeServiceProps, 'service' | 'store'>
}

export interface State {

}

class CustomizeType extends React.Component<Props, State> {
    render (): React.ReactNode {

        const { store, type, className, name, acceptAll, declineAll, noNeedConsent } = this.props

        return <>
            <div className={className !== undefined ? className(type) : 'd-flex justify-content-between align-items-center border-top py-2'}>
                <div>
                    <Button
                        color={name?.btn?.color !== undefined ? name.btn.color(type) : 'primary'}
                        size={name?.btn?.size?.(type)}
                        outline={name?.btn?.outline !== undefined ? name.btn.outline(type) : type.expanded}
                        className={name?.btn?.className !== undefined ? name.btn.className(type) : 'me-2' }
                        onClick={() => store.toggleType(type.id)}
                        >
                        {name?.btn?.content !== undefined ? name.btn.content(type) : '+'}
                    </Button>
                    {name?.content !== undefined ? name.content(type) : type.id}
                </div>
                <div>
                    { type.needConsent ? (
                        <>
                            <Button
                                color={acceptAll?.color !== undefined ? acceptAll.color(type) : 'primary'}
                                size={acceptAll?.size?.(type)}
                                outline={acceptAll?.outline !== undefined ? acceptAll.outline(type) : type.choice != 'yes'}
                                className={acceptAll?.className !== undefined ? acceptAll.className(type) : '' }
                                onClick={() => store.acceptType(type.id)}
                                >
                                {acceptAll?.content !== undefined ? acceptAll.content(type) : 'Accept all'}
                            </Button>
                            <Button
                                color={declineAll?.color !== undefined ? declineAll.color(type) : 'primary'}
                                size={declineAll?.size?.(type)}
                                outline={declineAll?.outline !== undefined ? declineAll.outline(type) : type.choice != 'no'}
                                className={declineAll?.className !== undefined ? declineAll.className(type) : 'ms-2' }
                                onClick={() => store.declineType(type.id)}
                                >
                                {declineAll?.content !== undefined ? declineAll.content(type) : 'Decline all'}
                            </Button>
                        </>
                    ) : (
                        noNeedConsent !== undefined ? noNeedConsent(type) : 'Required'
                    )}
                </div>
            </div>
            <Collapse isOpen={type.expanded}>
                <ListGroup flush>
                    { type.services.map((service: ServiceInformations) => (
                        <CustomizeService {...this.props.service} key={service.id} service={service} store={store} />
                    ))}
                </ListGroup>
            </Collapse>
        </>
    }
}

export default observer(CustomizeType)
