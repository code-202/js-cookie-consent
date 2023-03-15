import * as React from 'react'
import { observer } from 'mobx-react'
import { Store } from './store'
import { getKernel } from '@code-202/kernel'

export interface Props {

}

export interface State {

}

export class Launcher extends React.Component<Props, State> {
    private store: Store

    constructor(props: Props) {
        super(props)

        this.store = getKernel().container.get('cookie-consent') as Store
    }

    render (): React.ReactNode {
        if (this.store.noCookie !== false) {
            return null
        }

        return <>
            <button
                className="cookie-consent-btn"
                onClick={() => this.store.toggleDialog()}
                >
                { this.renderContent() }
            </button>
        </>
    }

    renderContent (): React.ReactNode {
        return 'Manage cookie consent'
    }
}

export default observer(Launcher)
