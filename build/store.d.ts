import Cookies from 'universal-cookie';
import { ServiceOptions, Service } from './service';
export interface PartialStoreOptions {
    isCustomizationEnabled?: boolean;
    cookie?: {
        name?: string;
        path?: string;
        domain?: string;
        maxAge?: number;
        secure?: boolean;
    };
}
export interface StoreOptions {
    customizable: boolean;
    cookie: {
        name: string;
        path: string;
        domain?: string;
        maxAge: number;
        secure: boolean;
    };
}
export declare class Store {
    services: Service[];
    isDeclineAll: boolean;
    isAcceptAll: boolean;
    noCookie: boolean | undefined;
    dialogIsOpened: boolean;
    protected _options: StoreOptions;
    protected _cookies: Cookies;
    protected initConsents: string[];
    constructor(options: PartialStoreOptions, cookies?: string);
    initialization(): void;
    initialize(): void;
    toggleDialog(): void;
    addService(options: ServiceOptions): boolean;
    get isCustomizable(): boolean;
    accept(id: string): void;
    decline(id: string): void;
    acceptAll(): void;
    declineAll(): void;
    get consents(): string[];
    protected loadTokenFromCookie(): void;
    get nbNeedConcentServices(): number;
    protected findService(id: string): Service | undefined;
    protected saveConsentsInCookie(): void;
}
