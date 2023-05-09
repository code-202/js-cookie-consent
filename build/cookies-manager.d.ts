import { Cookie, CookieGetOptions, CookieSetOptions } from 'universal-cookie';
export declare class CookiesManagerWrapper implements CookiesManager {
    private cookiesManager;
    private cookies;
    private enabler;
    constructor(cookiesManager: CookiesManager, cookies: string[], enabler: () => boolean);
    set(name: string, value: Cookie, options?: CookieSetOptions): void;
    get(name: string, options?: CookieGetOptions): any;
    remove(name: string, options?: CookieSetOptions): void;
}
export declare class CookieError extends Error {
}
export declare class AccessDeniedError extends CookieError {
}
export declare class DisabledError extends CookieError {
}
export interface CookiesManager {
    get(name: string, options?: CookieGetOptions): any;
    set(name: string, value: Cookie, options?: CookieSetOptions): void;
    remove(name: string, options?: CookieSetOptions): void;
}
