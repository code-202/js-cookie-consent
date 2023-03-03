"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Service = void 0;
const mobx_1 = require("mobx");
class Service {
    consent = 'unknown';
    _options;
    constructor(options) {
        (0, mobx_1.makeObservable)(this, {
            consent: mobx_1.observable,
            accept: mobx_1.action,
            decline: mobx_1.action,
        });
        this._options = options;
    }
    get id() {
        return this._options.id;
    }
    get needConsent() {
        return this._options.needConsent;
    }
    get type() {
        return this._options.type;
    }
    get name() {
        return this._options.name;
    }
    get cookies() {
        return this._options.cookies ? this._options.cookies : [];
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
            this._options.onAccept();
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
    }
}
exports.Service = Service;
