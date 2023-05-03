import * as React from 'react'
import { observer } from 'mobx-react'
import { Store, TypeOptions } from './store'
import { getKernel } from '@code-202/kernel'
import CustomizeType, { Props as CustomizeTypeProps } from './customize-type'

export interface Props {
    type?: Omit<CustomizeTypeProps, 'type' | 'store'>
}

export interface State {

}

class Customize extends React.Component<Props, State> {
    protected store: Store

    constructor(props: Props) {
        super(props)

        this.store = getKernel().container.get('cookie-consent') as Store
    }

    render (): React.ReactNode {

        const types = this.store.types

        return <>
            { types.map((type: TypeOptions) => (
                <CustomizeType {...this.props.type} key={type.id} type={type} store={this.store} />
            )) }
        </>
    }
}

export default observer(Customize)
