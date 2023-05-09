import { makeObservable, observable, action } from 'mobx'
import { CookiesManager, CookiesManagerWrapper } from './cookies-manager'

export interface ServiceDefinition {
    id: string
    needConsent: boolean
    type?: string
    name?: string
    cookies: string[]
}

export interface ServiceOptions extends ServiceDefinition {
    onAccept?: (manager: CookiesManagerWrapper) => void
    onDecline?: () => void
}

export interface ServiceInformations extends ServiceDefinition {
    consent: ConsentResponse
}

export type ConsentResponse = 'yes' | 'no' | 'unknown'

export class Service implements ServiceInformations {
    public consent: ConsentResponse = 'unknown'
    protected _options: ServiceOptions
    protected _cookies: CookiesManager

    constructor(options: ServiceOptions, cookies: CookiesManager) {
        makeObservable(this, {
            consent: observable,

            accept: action,
            decline: action,
        })

        this._options = options
        this._cookies = cookies
    }

    public get id (): string {
        return this._options.id
    }

    public get needConsent (): boolean {
        return this._options.needConsent
    }

    public get type (): string {
        return this._options.type || 'default'
    }

    public get name (): string {
        return this._options.name !== undefined ? this._options.name : this.type+'.'+this.id
    }

    public get cookies (): string[] {
        return this._options.cookies
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

    public accept (): void {
        if (this.consent == 'yes') {
            return
        }

        this.consent = 'yes'

        if (this._options.onAccept) {
            this._options.onAccept(new CookiesManagerWrapper(this._cookies, this.definition.cookies, () => this.consent === 'yes'))
        }
    }

    public decline (): void {
        if (this.consent == 'no') {
            return
        }

        this.consent = 'no'

        if (this._options.onDecline) {
            this._options.onDecline()
        }

        for (const cookie of this.definition.cookies) {
            this._cookies.remove(cookie)
        }
    }
}
