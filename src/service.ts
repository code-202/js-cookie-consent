import { makeObservable, observable, action } from 'mobx'

export interface ServiceDefinition {
    id: string
    needConsent: boolean
    type: string
    name: string
    cookies?: string[]
}

export interface ServiceOptions extends ServiceDefinition {
    onAccept?: () => void
    onDecline?: () => void
}

export type ConsentResponse = 'yes' | 'no' | 'unknown'

export class Service implements ServiceDefinition {
    public consent: ConsentResponse = 'unknown'
    protected _options: ServiceOptions

    constructor(options: ServiceOptions) {
        makeObservable(this, {
            consent: observable,

            accept: action,
            decline: action,
        })

        this._options = options
    }

    public get id (): string {
        return this._options.id
    }

    public get needConsent (): boolean {
        return this._options.needConsent
    }

    public get type (): string {
        return this._options.type
    }

    public get name (): string {
        return this._options.name
    }

    public get cookies (): string[] {
        return this._options.cookies ? this._options.cookies : []
    }

    public get definition (): ServiceDefinition {
        return {
            id: this.id,
            needConsent: this.needConsent,
            type: this.type,
            name: this.name,
            cookies: this.cookies
        }
    }

    public accept(): void {
        if (this.consent == 'yes') {
            return
        }

        this.consent = 'yes'

        if (this._options.onAccept) {
            this._options.onAccept()
        }
    }

    public decline(): void {
        if (this.consent == 'no') {
            return
        }

        this.consent = 'no'

        if (this._options.onDecline) {
            this._options.onDecline()
        }
    }
}
