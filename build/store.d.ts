import Cookies from 'universal-cookie';
import { ServiceInformations, ServiceOptions, Service, ConsentResponse } from './service';
import { Denormalizable, Normalizable } from '@code-202/serializer';
export interface PartialStoreOptions {
    customizable?: boolean;
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
export interface TypeOptions {
    id: string;
    needConsent: boolean;
    choice: ConsentResponse;
    expanded: boolean;
    services: ServiceInformations[];
}
export declare class Store implements Normalizable<StoreNormalized>, Denormalizable<StoreNormalized> {
    services: Service[];
    noCookie: boolean | undefined;
    globalConsent: ConsentResponse;
    dialogIsOpened: boolean;
    newServiceSinceLastConsent: boolean;
    customizing: boolean;
    typesExpanded: string[];
    protected _options: StoreOptions;
    protected _cookies: Cookies;
    constructor(options: PartialStoreOptions, cookies?: string);
    initialize(): void;
    get isClosable(): boolean;
    get isAcceptAll(): boolean;
    get isDeclineAll(): boolean;
    toggleDialog(): void;
    toggleCustomize(): void;
    toggleType(type: string): void;
    get types(): TypeOptions[];
    addService(options: ServiceOptions): boolean;
    get isCustomizable(): boolean;
    accept(id: string): void;
    decline(id: string): void;
    acceptType(type: string): void;
    declineType(type: string): void;
    acceptAll(): void;
    declineAll(): void;
    get consents(): string[];
    get unconsents(): string[];
    protected loadTokenFromCookie(): void;
    get nbNeedConcentServices(): number;
    protected findService(id: string): Service | undefined;
    protected saveConsentsInCookie(): void;
    normalize(): StoreNormalized;
    denormalize(data: StoreNormalized): void;
}
export interface StoreNormalized {
    noCookie: boolean | undefined;
    dialogIsOpened: boolean;
}
