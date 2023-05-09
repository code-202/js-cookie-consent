"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Service = void 0;
const mobx_1 = require("mobx");
const cookies_manager_1 = require("./cookies-manager");
class Service {
    consent = 'unknown';
    _options;
    _cookies;
    constructor(options, cookies) {
        (0, mobx_1.makeObservable)(this, {
            consent: mobx_1.observable,
            accept: mobx_1.action,
            decline: mobx_1.action,
        });
        this._options = options;
        this._cookies = cookies;
    }
    get id() {
        return this._options.id;
    }
    get needConsent() {
        return this._options.needConsent;
    }
    get type() {
        return this._options.type || 'default';
    }
    get name() {
        return this._options.name !== undefined ? this._options.name : this.type + '.' + this.id;
    }
    get cookies() {
        return this._options.cookies;
    }
    get definition() {
        return {
            id: this.id,
            needConsent: this.needConsent,
            type: this.type,
            name: this.name,
            cookies: this.cookies
        };
    }
    accept() {
        if (this.consent == 'yes') {
            return;
        }
        this.consent = 'yes';
        if (this._options.onAccept) {
            this._options.onAccept(new cookies_manager_1.CookiesManagerWrapper(this._cookies, this.definition.cookies, () => this.consent === 'yes'));
        }
    }
    decline() {
        if (this.consent == 'no') {
            return;
        }
        this.consent = 'no';
        if (this._options.onDecline) {
            this._options.onDecline();
        }
        for (const cookie of this.definition.cookies) {
            this._cookies.remove(cookie);
        }
    }
}
exports.Service = Service;
