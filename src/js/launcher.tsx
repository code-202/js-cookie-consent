import * as React from 'react'
import { observer } from 'mobx-react'
import { Store } from './store'
import { getKernel } from '@code-202/kernel'

export interface Props {
    storeId?: string
    className?: string
    content?: (store: Store) => React.ReactNode
    alwaysShown?: boolean
}

export interface State {

}

export class Launcher extends React.Component<Props, State> {
    protected store: Store

    constructor(props: Props) {
        super(props)

        this.store = getKernel().container.get(props.storeId !== undefined ? props.storeId : 'cookie-consent') as Store
    }

    render (): React.ReactNode {
        if (!this.props.alwaysShown && this.store.noCookie !== false) {
            return null
        }

        return <>
            <button
                className={ this.props.className !== undefined ? this.props.className : 'm-1 border-0' }
                onClick={() => this.store.toggleDialog()}
                >
                { this.props.content !== undefined ? this.props.content(this.store) : 'Manage cookie consent' }
            </button>
        </>
    }
}

export default observer(Launcher)
