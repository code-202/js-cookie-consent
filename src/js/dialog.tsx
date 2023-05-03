import * as React from 'react'
import { observer } from 'mobx-react'
import { Store } from './store'
import { Button, Collapse, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap'
import { getKernel } from '@code-202/kernel'
import Customize, { Props as CustomizeProps } from './customize'

interface BtnProps {
    color?: string
    size?: string
    outline?: boolean
    className?: string
    content?: (store: Store) => React.ReactNode
}

export interface Props {
    storeId?: string
    className?: string
    header?: {
        className: string
        content: (store: Store) => React.ReactNode
    }
    body?: {
        className?: string
        content?: (store: Store, customize: React.ReactNode) => React.ReactNode
    }
    footer?: {
        className?: string
        collapse?: {
            className?: string
            contentClassName?: string
        }
        acceptAll?: BtnProps
        declineAll?: BtnProps
        customize?: BtnProps
        close?: BtnProps
    }
    customize?: CustomizeProps
}

export interface State {

}

class Dialog extends React.Component<Props, State> {
    protected store: Store

    constructor(props: Props) {
        super(props)

        this.store = getKernel().container.get(props.storeId !== undefined ? props.storeId : 'cookie-consent') as Store
    }

    render (): React.ReactNode {
        const { className, header, body, footer } = this.props

        const customize = <Customize {...this.props.customize}/>

        return <>
            <Modal isOpen={this.store.dialogIsOpened} centered toggle={this.store.noCookie !== true ? () => this.store.toggleDialog() : undefined} className={className}>
                <ModalHeader className={header?.className} toggle={this.store.noCookie !== true ? () => this.store.toggleDialog() : undefined}>
                    {header?.content !== undefined ? header.content(this.store) : (
                        this.store.newServiceSinceLastConsent ? 'New cookie from last consent !' : 'Cookie Consent ?'
                    )}
                </ModalHeader>
                <ModalBody className={body?.className}>
                    {body?.content !== undefined ? body.content(this.store, customize) : (
                        !this.store.customizing ? null : customize
                    )}
                </ModalBody>
                <ModalFooter className={footer?.className}>
                    <Collapse isOpen={!this.store.customizing} className={footer?.collapse?.className !== undefined ? footer.collapse.className : 'w-100'}>
                        <div className={footer?.collapse !== undefined ? footer.collapse.contentClassName : 'd-flex justify-content-between align-items-center'}>
                            <Button
                                color={footer?.acceptAll?.color !== undefined ? footer.acceptAll.color : 'primary'}
                                size={footer?.acceptAll?.size}
                                outline={footer?.acceptAll?.outline !== undefined ? footer.acceptAll.outline : false}
                                className={footer?.acceptAll?.className !== undefined ? footer.acceptAll.className : '' }
                                onClick={this.onAcceptClickHandler}
                                >
                                {footer?.acceptAll?.content !== undefined ? footer.acceptAll.content(this.store) : 'Accept all'}
                            </Button>
                            <Button
                                color={footer?.declineAll?.color !== undefined ? footer.declineAll.color : 'dark'}
                                size={footer?.declineAll?.size}
                                outline={footer?.declineAll?.outline !== undefined ? footer.declineAll.outline : true}
                                className={footer?.declineAll?.className !== undefined ? footer.declineAll.className : '' }
                                onClick={this.onDeclineClickHandler}
                                >
                                {footer?.declineAll?.content !== undefined ? footer.declineAll.content(this.store) : 'Decline all'}
                            </Button>
                            { this.store.isCustomizable && (
                                <Button
                                    color={footer?.customize?.color !== undefined ? footer.customize.color : 'secondary'}
                                    size={footer?.customize?.size}
                                    outline={footer?.customize?.outline !== undefined ? footer.customize.outline : false}
                                    className={footer?.customize?.className !== undefined ? footer.customize.className : '' }

                                    onClick={this.onCustomizeClickHandler}
                                    >
                                    {footer?.customize?.content !== undefined ? footer.customize.content(this.store) : 'Customize'}
                                </Button>
                            )}
                        </div>
                    </Collapse>
                    <Collapse isOpen={this.store.customizing}>
                        <Button
                            color={footer?.close?.color !== undefined ? footer.close.color : 'secondary'}
                            size={footer?.close?.size}
                            outline={footer?.close?.outline !== undefined ? footer.close.outline : false}
                            className={footer?.close?.className !== undefined ? footer.close.className : '' }
                            onClick={this.onCloseClickHandler}
                            >
                            {footer?.close?.content !== undefined ? footer.close.content(this.store) : 'Close'}
                        </Button>
                    </Collapse>
                </ModalFooter>
            </Modal>
        </>
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
