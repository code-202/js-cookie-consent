import { Cookie, CookieGetOptions, CookieSetOptions } from 'universal-cookie'

export class CookiesManagerWrapper implements CookiesManager
{
    private cookiesManager: CookiesManager
    private cookies: string[]

    constructor(cookiesManager: CookiesManager, cookies: string[]) {
        this.cookiesManager = cookiesManager
        this.cookies = cookies
    }
    public set (name: string, value: Cookie, options?: CookieSetOptions) : void {
        if (this.cookies.indexOf(name) < 0) {
            throw new AccessDeniedError('access denied')
        }

        this.cookiesManager.set(name, value, options)
    }

    public get (name: string, options?: CookieGetOptions): any {
        if (this.cookies.indexOf(name) < 0) {
            throw new AccessDeniedError('access denied')
        }

        this.cookiesManager.get(name, options)
    }

    public remove (name: string, options?: CookieSetOptions): void {
        if (this.cookies.indexOf(name) < 0) {
            throw new AccessDeniedError('access denied')
        }

        this.cookiesManager.remove(name, options)
    }
}


export class CookieError extends Error {}
export class AccessDeniedError extends CookieError {}

export interface CookiesManager {
    get (name: string, options?: CookieGetOptions): any
    set (name: string, value: Cookie, options?: CookieSetOptions): void
    remove (name: string, options?: CookieSetOptions): void
}
