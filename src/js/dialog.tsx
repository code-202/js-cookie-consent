import * as React from 'react'
import { observer } from 'mobx-react'
import { Store } from './store'
import { Button, Collapse, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap'
import { getKernel } from '@code-202/kernel'
import Customize from './customize'

export interface Props {

}

export interface State {

}

class Dialog extends React.Component<Props, State> {
    protected store: Store

    constructor(props: Props) {
        super(props)

        this.store = getKernel().container.get('cookie-consent') as Store
    }

    render (): React.ReactNode {

        return <>
            <Modal isOpen={this.store.dialogIsOpened} centered toggle={this.store.noCookie !== true ? () => this.store.toggleDialog() : undefined} className="cookie-consent-dialog">
                <ModalHeader className="cookie-consent-dialog-body" toggle={this.store.noCookie !== true ? () => this.store.toggleDialog() : undefined}>
                    { this.renderModalHeader() }
                </ModalHeader>
                <ModalBody className="cookie-consent-dialog-body">
                    { this.renderModalBody() }
                </ModalBody>
                <ModalFooter className="cookie-consent-dialog-footer">
                    <Collapse isOpen={!this.store.customizing} className="w-100">
                        <div className="d-flex justify-content-between">
                            <button onClick={this.onAcceptClickHandler} className="cookie-consent-dialog-btn-accept">
                                { this.renderButtonAcceptAll() }
                            </button>
                            <button onClick={this.onDeclineClickHandler} className="cookie-consent-dialog-btn-decline">
                                { this.renderButtonDeclineAll() }
                            </button>
                            { this.store.isCustomizable && (
                                <button onClick={this.onCustomizeClickHandler}  className="cookie-consent-dialog-btn-customize">
                                    { this.renderButtonCustomize() }
                                </button>
                            )}
                        </div>
                    </Collapse>
                    <Collapse isOpen={this.store.customizing}>
                        <button onClick={this.onCloseClickHandler}  className="cookie-consent-dialog-btn-close">
                            { this.renderButtonClose() }
                        </button>
                    </Collapse>
                </ModalFooter>
            </Modal>
        </>
    }

    renderModalHeader (): React.ReactNode {
        return this.store.newServiceSinceLastConsent ? 'New cookie from last consent !' : 'Cookie Consent ?'
    }

    renderModalBody (): React.ReactNode {
        if (!this.store.customizing) {
            return null
        }

        return <Customize />
    }

    renderButtonAcceptAll (): React.ReactNode {
        return 'Accept all'
    }

    renderButtonDeclineAll (): React.ReactNode {
        return 'Decline all'
    }

    renderButtonCustomize (): React.ReactNode {
        return 'Customize'
    }

    renderButtonClose (): React.ReactNode {
        return 'Close'
    }

    protected onDeclineClickHandler = (): void => {
        this.store.declineAll()
    }

    protected onAcceptClickHandler = (): void => {
        this.store.acceptAll()
    }

    protected onCustomizeClickHandler = (): void => {
        this.store.toggleCustomize()
    }

    protected onCloseClickHandler = (): void => {
        if (this.store.isClosable) {
            this.store.toggleDialog()
        } else {
            this.store.toggleCustomize()
        }
    }
}

export default observer(Dialog)
