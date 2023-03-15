import { makeObservable, action, observable, computed } from 'mobx'
import Cookies, { CookieSetOptions } from 'universal-cookie'
import { merge } from 'lodash'
import { ServiceDefinition, ServiceOptions, Service } from './service'
import { Denormalizable, Normalizable } from '@code-202/serializer'

export interface PartialStoreOptions {
    customizable?: boolean
    cookie?: {
        name?: string
        path?: string
        domain?: string
        maxAge?: number
        secure?: boolean
    }
}

export interface StoreOptions {
    customizable: boolean
    cookie: {
        name: string
        path: string
        domain?: string
        maxAge: number
        secure: boolean
    }
}

export class Store implements Normalizable<StoreNormalized>, Denormalizable<StoreNormalized> {
    public services: Service[] = []
    public isDeclineAll: boolean = false
    public isAcceptAll: boolean = false
    public noCookie: boolean | undefined = undefined
    public dialogIsOpened: boolean = false
    protected _options: StoreOptions
    protected _cookies: Cookies
    protected initConsents: string[] = []

    constructor(options: PartialStoreOptions, cookies?: string) {
        makeObservable(this, {
            services: observable,
            isDeclineAll: observable,
            isAcceptAll: observable,
            noCookie: observable,
            dialogIsOpened: observable,

            consents: computed,
            nbNeedConcentServices: computed,

            initialize: action,
            toggleDialog: action,
            addService: action,
            accept: action,
            decline: action,
            acceptAll: action,
            declineAll: action,
        })

        this._options = merge(
            {
                customizable: false,
                cookie: {
                    name: '_cc',
                    path: '/',
                    maxAge: 365 * 24 * 60 * 60,
                    secure: true
                },
            } as StoreOptions,
            options
        )

        this._cookies = new Cookies(cookies)
    }

    public initialize (): void {
        this.loadTokenFromCookie()

        this.dialogIsOpened = this.noCookie === true && this.nbNeedConcentServices > 0
    }

    public toggleDialog (): void {
        this.dialogIsOpened = !this.dialogIsOpened
    }

    public addService (options: ServiceOptions): boolean {
        const already = this.findService(options.id)

        if (already) {
            return false
        }

        const service = new Service(options)

        if (this.isAcceptAll || this.initConsents.indexOf(service.id) >= 0) {
            service.accept()
        }

        this.services.push(service)

        return true
    }

    public get isCustomizable(): boolean {
        return this._options.customizable
    }

    public accept(id: string): void {
        const service = this.findService(id)

        if (service) {
            service.accept()
        }
    }

    public decline(id: string): void {
        const service = this.findService(id)

        if (service) {
            service.decline()
        }
    }

    public acceptAll(): void {
        for (const service of this.services) {
            service.accept()
        }

        this.isAcceptAll = true
        this.isDeclineAll = false

        this.saveConsentsInCookie()

        this.dialogIsOpened = false
    }

    public declineAll(): void {
        for (const service of this.services) {
            service.decline()
        }

        this.isAcceptAll = false
        this.isDeclineAll = true

        this.saveConsentsInCookie()

        this.dialogIsOpened = false
    }

    public get consents (): string[] {
        const consents: string[] = []

        for (const service of this.services) {
            if (service.consent == 'yes') {
                consents.push(service.id)
            }
        }

        return consents
    }

    protected loadTokenFromCookie (): void {
        const cookie = this._cookies.get(this._options.cookie.name)

        if (cookie === undefined) {
            this.noCookie = true
            return
        }

        this.noCookie = false

        this.initConsents = cookie.split('|')

        for (const id of this.initConsents) {
            const service = this.findService(id)
            if (service) {
                service.accept()
            }
        }
    }

    public get nbNeedConcentServices (): number {
        return (this.services.filter((s: Service) => s.needConsent)).length
    }

    protected findService (id: string): Service | undefined {
        for (const service of this.services) {
            if (service.id === id) {
                return service
            }
        }
    }

    protected saveConsentsInCookie (): void {
        const options: CookieSetOptions = {
            path: this._options.cookie.path,
            domain: this._options.cookie.domain,
            maxAge: this._options.cookie.maxAge,
            secure: this._options.cookie.secure,
        }

        this._cookies.set(this._options.cookie.name, this.consents.join('|'), options)

        this.noCookie = false
    }

    normalize (): StoreNormalized {
        const data = {
            isDeclineAll: this.isDeclineAll,
            isAcceptAll: this.isAcceptAll,
            noCookie: this.noCookie,
            dialogIsOpened: this.dialogIsOpened,
            options: this._options,
        };

        return data
    }

    denormalize (data: StoreNormalized) {
        action(() => {
            this.isDeclineAll = data.isDeclineAll
            this.isAcceptAll = data.isAcceptAll
            this.noCookie = data.noCookie
            this.dialogIsOpened = data.dialogIsOpened
            this._options = data.options
        })()
    }
}

export interface StoreNormalized {
    isDeclineAll: boolean
    isAcceptAll: boolean
    noCookie: boolean | undefined
    dialogIsOpened: boolean
    options: StoreOptions
}
