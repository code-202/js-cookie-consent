import * as React from 'react'
import { observer } from 'mobx-react'
import { Store, TypeOptions } from './store'
import { Button, Collapse, ListGroup } from 'reactstrap'
import { ConsentResponse, ServiceInformations } from './service'
import CustomizeService from './customize-service'

export interface Props {
    store: Store
    type: TypeOptions
}

export interface State {

}

class CustomizeType extends React.Component<Props, State> {
    render (): React.ReactNode {

        const { store, type } = this.props

        return <>
            <div className="d-flex justify-content-between">
                { this.renderTypeName() }
                <div>
                    { type.needConsent ? (
                        <>
                            { this.renderAcceptAll() }
                            { this.renderDeclineAll() }
                        </>
                    ) : (
                        this.renderNoNeedConcent()
                    )}
                </div>
            </div>
            <Collapse isOpen={type.expanded}>
                <ListGroup flush>
                    { type.services.map((service: ServiceInformations) => this.renderService(service))}
                </ListGroup>
            </Collapse>
        </>
    }

    renderTypeName (): React.ReactNode {
        return <span>{ this.props.type.id }</span>
    }

    renderAcceptAll (): React.ReactNode {
        return <Button
            color="primary"
            outline={this.props.type.choice != 'yes'}
            onClick={() => this.props.store.acceptType(this.props.type.id)}
            >
            { this.renderAcceptAllContent(this.props.type.choice) }
        </Button>
    }

    renderAcceptAllContent (choice: ConsentResponse ): React.ReactNode {
        return 'Accept all'
    }

    renderDeclineAll (): React.ReactNode {
        return <Button
            color="primary"
            outline={this.props.type.choice != 'no'}
            onClick={() => this.props.store.declineType(this.props.type.id)}
            >
            { this.renderDeclineAllContent(this.props.type.choice) }
        </Button>
    }

    renderDeclineAllContent (choice: ConsentResponse ): React.ReactNode {
        return 'Decline all'
    }

    renderService (service: ServiceInformations): React.ReactNode {
        return <CustomizeService key={service.id} service={service} store={this.props.store} />
    }

    renderNoNeedConcent(): React.ReactNode {
        return 'Required'
    }
}

export default observer(CustomizeType)