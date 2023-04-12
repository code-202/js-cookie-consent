import { makeObservable, action, observable, computed } from 'mobx'
import Cookies, { CookieSetOptions } from 'universal-cookie'
import { merge } from 'lodash'
import { ServiceInformations, ServiceOptions, Service, ConsentResponse } from './service'
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

export interface TypeOptions {
    id: string
    needConsent: boolean
    choice: ConsentResponse
    expanded: boolean
    services: ServiceInformations[]
}

export class Store implements Normalizable<StoreNormalized>, Denormalizable<StoreNormalized> {
    public services: Service[] = []
    public noCookie: boolean | undefined = undefined
    public globalConsent: ConsentResponse = 'unknown'
    public dialogIsOpened: boolean = false
    public newServiceSinceLastConsent: boolean = false
    public customizing: boolean = false
    public typesExpanded: string[] = []
    protected _options: StoreOptions
    protected _cookies: Cookies

    constructor(options: PartialStoreOptions, cookies?: string) {
        makeObservable(this, {
            services: observable,
            noCookie: observable,
            globalConsent: observable,
            dialogIsOpened: observable,
            newServiceSinceLastConsent: observable,
            customizing: observable,
            typesExpanded: observable,

            consents: computed,
            isDeclineAll: computed,
            isAcceptAll: computed,
            nbNeedConcentServices: computed,
            types: computed,

            initialize: action,
            toggleDialog: action,
            toggleCustomize: action,
            addService: action,
            accept: action,
            decline: action,
            acceptAll: action,
            declineAll: action,
            toggleType: action,
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

        this.dialogIsOpened = !this.isClosable

        this.newServiceSinceLastConsent = this.noCookie === false && this.nbNeedConcentServices > 0
    }

    public get isClosable(): boolean
    {
        return this.noCookie !== true && this.nbNeedConcentServices == 0
    }

    public get isAcceptAll(): boolean {
        for (const service of this.services) {
            if (service.consent != 'yes') {
                return false
            }
        }

        return true
    }

    public get isDeclineAll(): boolean {
        for (const service of this.services) {
            if (service.consent != 'no' && service.needConsent) {
                return false
            }
        }

        return true
    }

    public toggleDialog (): void {

        this.dialogIsOpened = !this.dialogIsOpened

        if (!this.dialogIsOpened && !this.isClosable) {
            this.dialogIsOpened = true
        }
    }

    public toggleCustomize (): void {
        this.globalConsent = 'unknown'
        this.customizing = !this.customizing
    }

    public toggleType(type: string): void {
        const index = this.typesExpanded.indexOf(type)
        if (index >= 0) {
            this.typesExpanded.splice(index, 1)
        } else {
            this.typesExpanded.push(type)
        }
    }

    public get types (): TypeOptions[] {
        const types: Record<string, TypeOptions> = {}

        for (const service of this.services) {
            const key = service.type+''
            if (types[key] === undefined) {
                types[key] = {
                    id: key,
                    needConsent: service.needConsent,
                    choice: service.consent,
                    expanded: this.typesExpanded.indexOf(key) >= 0,
                    services: [ service ]
                }
            } else {
                if (types[key].choice != service.consent) {
                    types[key].choice = 'unknown'
                }
                if (service.needConsent) {
                    types[key].needConsent = true
                }
                types[key].services.push(service)
            }
        }

        return Object.values(types)
    }

    public addService (options: ServiceOptions): boolean {
        const already = this.findService(options.id)

        if (already) {
            return false
        }

        const service = new Service(options)

        if (this.globalConsent == 'yes' || !service.needConsent) {
            service.accept()
        } else if (this.globalConsent == 'no') {
            service.decline()
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

            this.saveConsentsInCookie()
        }
    }

    public decline(id: string): void {
        const service = this.findService(id)

        if (service && service.needConsent) {
            service.decline()

            this.saveConsentsInCookie()
        }
    }

    public acceptType(type: string): void {
        for (const service of this.services) {
            if (service.type == type) {
                service.accept()

                this.saveConsentsInCookie()
            }
        }
    }

    public declineType(type: string): void {
        for (const service of this.services) {
            if (service.type == type && service.needConsent) {
                service.decline()

                this.saveConsentsInCookie()
            }
        }
    }

    public acceptAll(): void {
        for (const service of this.services) {
            service.accept()
        }

        this.globalConsent = 'yes'

        this.saveConsentsInCookie()

        this.dialogIsOpened = false
    }

    public declineAll(): void {
        for (const service of this.services) {
            if (service.needConsent) {
                service.decline()
            }
        }

        this.globalConsent = 'no'

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

    public get unconsents (): string[] {
        const unconsents: string[] = []

        for (const service of this.services) {
            if (service.consent == 'no') {
                unconsents.push(service.id)
            }
        }

        return unconsents
    }

    protected loadTokenFromCookie (): void {
        const cookie = this._cookies.get(this._options.cookie.name)

        if (cookie === undefined) {
            this.noCookie = true
            return
        }

        this.noCookie = false

        const [c, u] = cookie.split('!')

        for (const id of c.split('|')) {
            const service = this.findService(id)
            if (service) {
                service.accept()
            }
        }
        if (u) {
            for (const id of u.split('|')) {
                const service = this.findService(id)
                if (service) {
                    service.decline()
                }
            }
        }
    }

    public get nbNeedConcentServices (): number {
        return (this.services.filter((s: Service) => s.needConsent && s.consent == 'unknown')).length
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

        this._cookies.set(this._options.cookie.name, this.consents.join('|')+'!'+this.unconsents.join('|'), options)

        action(() => {
            this.noCookie = false
        })()
    }

    normalize (): StoreNormalized {
        const data = {
            noCookie: this.noCookie,
            dialogIsOpened: this.dialogIsOpened,
        };

        return data
    }

    denormalize (data: StoreNormalized) {
        action(() => {
            this.noCookie = data.noCookie
            this.dialogIsOpened = data.dialogIsOpened
        })()
    }
}

export interface StoreNormalized {
    noCookie: boolean | undefined
    dialogIsOpened: boolean
}
