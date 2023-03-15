"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Store = void 0;
const mobx_1 = require("mobx");
const universal_cookie_1 = __importDefault(require("universal-cookie"));
const lodash_1 = require("lodash");
const service_1 = require("./service");
class Store {
    services = [];
    isDeclineAll = false;
    isAcceptAll = false;
    noCookie = undefined;
    dialogIsOpened = false;
    _options;
    _cookies;
    initConsents = [];
    constructor(options, cookies) {
        (0, mobx_1.makeObservable)(this, {
            services: mobx_1.observable,
            isDeclineAll: mobx_1.observable,
            isAcceptAll: mobx_1.observable,
            noCookie: mobx_1.observable,
            dialogIsOpened: mobx_1.observable,
            consents: mobx_1.computed,
            nbNeedConcentServices: mobx_1.computed,
            initialize: mobx_1.action,
            toggleDialog: mobx_1.action,
            addService: mobx_1.action,
            accept: mobx_1.action,
            decline: mobx_1.action,
            acceptAll: mobx_1.action,
            declineAll: mobx_1.action,
        });
        this._options = (0, lodash_1.merge)({
            cookie: {
                name: '_cc',
                path: '/',
                maxAge: 365 * 24 * 60 * 60,
                secure: true
            }
        }, options);
        this._cookies = new universal_cookie_1.default(cookies);
    }
    initialize() {
        this.loadTokenFromCookie();
        this.dialogIsOpened = this.noCookie === true && this.nbNeedConcentServices > 0;
    }
    toggleDialog() {
        this.dialogIsOpened = !this.dialogIsOpened;
    }
    addService(options) {
        const already = this.findService(options.id);
        if (already) {
            return false;
        }
        const service = new service_1.Service(options);
        if (this.isAcceptAll || this.initConsents.indexOf(service.id) >= 0) {
            service.accept();
        }
        this.services.push(service);
        return true;
    }
    get isCustomizable() {
        return this._options.customizable;
    }
    accept(id) {
        const service = this.findService(id);
        if (service) {
            service.accept();
        }
    }
    decline(id) {
        const service = this.findService(id);
        if (service) {
            service.decline();
        }
    }
    acceptAll() {
        for (const service of this.services) {
            service.accept();
        }
        this.isAcceptAll = true;
        this.isDeclineAll = false;
        this.saveConsentsInCookie();
        this.dialogIsOpened = false;
    }
    declineAll() {
        for (const service of this.services) {
            service.decline();
        }
        this.isAcceptAll = false;
        this.isDeclineAll = true;
        this.saveConsentsInCookie();
        this.dialogIsOpened = false;
    }
    get consents() {
        const consents = [];
        for (const service of this.services) {
            if (service.consent == 'yes') {
                consents.push(service.id);
            }
        }
        return consents;
    }
    loadTokenFromCookie() {
        const cookie = this._cookies.get(this._options.cookie.name);
        if (cookie === undefined) {
            this.noCookie = true;
            return;
        }
        this.noCookie = false;
        this.initConsents = cookie.split('|');
        for (const id of this.initConsents) {
            const service = this.findService(id);
            if (service) {
                service.accept();
            }
        }
    }
    get nbNeedConcentServices() {
        return (this.services.filter((s) => s.needConsent)).length;
    }
    findService(id) {
        for (const service of this.services) {
            if (service.id === id) {
                return service;
            }
        }
    }
    saveConsentsInCookie() {
        const options = {
            path: this._options.cookie.path,
            domain: this._options.cookie.domain,
            maxAge: this._options.cookie.maxAge,
            secure: this._options.cookie.secure,
        };
        this._cookies.set(this._options.cookie.name, this.consents.join('|'), options);
        this.noCookie = false;
    }
    normalize() {
        const data = {
            isDeclineAll: this.isDeclineAll,
            isAcceptAll: this.isAcceptAll,
            noCookie: this.noCookie,
            dialogIsOpened: this.dialogIsOpened,
            options: this._options,
        };
        return data;
    }
    denormalize(data) {
        (0, mobx_1.action)(() => {
            this.isDeclineAll = data.isDeclineAll;
            this.isAcceptAll = data.isAcceptAll;
            this.noCookie = data.noCookie;
            this.dialogIsOpened = data.dialogIsOpened;
            this._options = data.options;
        })();
    }
}
exports.Store = Store;
