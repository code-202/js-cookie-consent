"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DisabledError = exports.AccessDeniedError = exports.CookieError = exports.CookiesManagerWrapper = void 0;
class CookiesManagerWrapper {
    cookiesManager;
    cookies;
    enabler;
    constructor(cookiesManager, cookies, enabler) {
        this.cookiesManager = cookiesManager;
        this.cookies = cookies;
        this.enabler = enabler;
    }
    set(name, value, options) {
        if (!this.enabler()) {
            throw new DisabledError('access disabled');
        }
        if (this.cookies.indexOf(name) < 0) {
            throw new AccessDeniedError('access denied');
        }
        this.cookiesManager.set(name, value, options);
    }
    get(name, options) {
        if (!this.enabler()) {
            throw new DisabledError('access disabled');
        }
        if (this.cookies.indexOf(name) < 0) {
            throw new AccessDeniedError('access denied');
        }
        this.cookiesManager.get(name, options);
    }
    remove(name, options) {
        if (this.cookies.indexOf(name) < 0) {
            throw new AccessDeniedError('access denied');
        }
        this.cookiesManager.remove(name, options);
    }
}
exports.CookiesManagerWrapper = CookiesManagerWrapper;
class CookieError extends Error {
}
exports.CookieError = CookieError;
class AccessDeniedError extends CookieError {
}
exports.AccessDeniedError = AccessDeniedError;
class DisabledError extends CookieError {
}
exports.DisabledError = DisabledError;
