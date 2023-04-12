import * as React from 'react'
import { observer } from 'mobx-react'
import { Store } from './store'
import { Button } from 'reactstrap'
import { ConsentResponse, ServiceInformations } from './service'

export interface Props {
    store: Store
    service: ServiceInformations
}

export interface State {

}

class CustomizeService extends React.Component<Props, State> {
    render (): React.ReactNode {

        const { store, service } = this.props

        return <>
            <div className="d-flex justify-content-between">
                { this.renderServiceName() }
                <div>
                    { service.needConsent ? (
                        <>
                            { this.renderAccept() }
                            { this.renderDecline() }
                        </>
                    ) : (
                        this.renderNoNeedConcent()
                    )}
                </div>
            </div>
        </>
    }

    renderServiceName (): React.ReactNode {
        return <span>{ this.props.service.id } ({this.props.service.cookies?.join(', ')})</span>
    }

    renderAccept (): React.ReactNode {
        return <Button
            color="primary"
            outline={this.props.service.consent != 'yes'}
            onClick={() => this.props.store.acceptType(this.props.service.id)}
            >
            { this.renderAcceptContent(this.props.service.consent) }
        </Button>
    }

    renderAcceptContent (choice: ConsentResponse ): React.ReactNode {
        return 'Accept'
    }

    renderDecline (): React.ReactNode {
        return <Button
            color="primary"
            outline={this.props.service.consent != 'no'}
            onClick={() => this.props.store.declineType(this.props.service.id)}
            className="ms-2"
            >
            { this.renderDeclineContent(this.props.service.consent) }
        </Button>
    }

    renderDeclineContent (choice: ConsentResponse ): React.ReactNode {
        return 'Decline'
    }

    renderNoNeedConcent(): React.ReactNode {
        return 'Required'
    }
}

export default observer(CustomizeService)
