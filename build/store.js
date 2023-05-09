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
    noCookie = undefined;
    globalConsent = 'unknown';
    dialogIsOpened = false;
    newServiceSinceLastConsent = false;
    customizing = false;
    typesExpanded = [];
    _options;
    _cookies;
    constructor(options, cookies) {
        (0, mobx_1.makeObservable)(this, {
            services: mobx_1.observable,
            noCookie: mobx_1.observable,
            globalConsent: mobx_1.observable,
            dialogIsOpened: mobx_1.observable,
            newServiceSinceLastConsent: mobx_1.observable,
            customizing: mobx_1.observable,
            typesExpanded: mobx_1.observable,
            consents: mobx_1.computed,
            isDeclineAll: mobx_1.computed,
            isAcceptAll: mobx_1.computed,
            nbNeedConcentServices: mobx_1.computed,
            types: mobx_1.computed,
            initialize: mobx_1.action,
            toggleDialog: mobx_1.action,
            toggleCustomize: mobx_1.action,
            addService: mobx_1.action,
            accept: mobx_1.action,
            decline: mobx_1.action,
            acceptAll: mobx_1.action,
            declineAll: mobx_1.action,
            toggleType: mobx_1.action,
        });
        this._options = (0, lodash_1.merge)({
            customizable: false,
            cookie: {
                name: '_cc',
                path: '/',
                maxAge: 365 * 24 * 60 * 60,
                secure: true
            },
        }, options);
        this._cookies = new universal_cookie_1.default(cookies);
    }
    initialize() {
        this.loadTokenFromCookie();
        this.dialogIsOpened = !this.isClosable;
        this.newServiceSinceLastConsent = this.noCookie === false && this.nbNeedConcentServices > 0;
    }
    get isClosable() {
        return this.noCookie !== true && this.nbNeedConcentServices == 0;
    }
    get isAcceptAll() {
        for (const service of this.services) {
            if (service.consent != 'yes') {
                return false;
            }
        }
        return true;
    }
    get isDeclineAll() {
        for (const service of this.services) {
            if (service.consent != 'no' && service.needConsent) {
                return false;
            }
        }
        return true;
    }
    toggleDialog() {
        this.dialogIsOpened = !this.dialogIsOpened;
        if (!this.dialogIsOpened && !this.isClosable) {
            this.dialogIsOpened = true;
        }
    }
    toggleCustomize() {
        this.globalConsent = 'unknown';
        this.customizing = !this.customizing;
    }
    toggleType(type) {
        const index = this.typesExpanded.indexOf(type);
        if (index >= 0) {
            this.typesExpanded.splice(index, 1);
        }
        else {
            this.typesExpanded.push(type);
        }
    }
    get types() {
        const types = {};
        for (const service of this.services) {
            const key = service.type + '';
            if (types[key] === undefined) {
                types[key] = {
                    id: key,
                    needConsent: service.needConsent,
                    choice: service.consent,
                    expanded: this.typesExpanded.indexOf(key) >= 0,
                    services: [service]
                };
            }
            else {
                if (types[key].choice != service.consent) {
                    types[key].choice = 'unknown';
                }
                if (service.needConsent) {
                    types[key].needConsent = true;
                }
                types[key].services.push(service);
            }
        }
        return Object.values(types);
    }
    addService(options) {
        const already = this.findService(options.id);
        if (already) {
            return false;
        }
        const service = new service_1.Service(options, this._cookies);
        if (this.globalConsent == 'yes' || !service.needConsent) {
            service.accept();
        }
        else if (this.globalConsent == 'no') {
            service.decline();
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
            this.saveConsentsInCookie();
        }
    }
    decline(id) {
        const service = this.findService(id);
        if (service && service.needConsent) {
            service.decline();
            this.saveConsentsInCookie();
        }
    }
    acceptType(type) {
        for (const service of this.services) {
            if (service.type == type) {
                service.accept();
                this.saveConsentsInCookie();
            }
        }
    }
    declineType(type) {
        for (const service of this.services) {
            if (service.type == type && service.needConsent) {
                service.decline();
                this.saveConsentsInCookie();
            }
        }
    }
    acceptAll() {
        for (const service of this.services) {
            service.accept();
        }
        this.globalConsent = 'yes';
        this.saveConsentsInCookie();
        this.dialogIsOpened = false;
    }
    declineAll() {
        for (const service of this.services) {
            if (service.needConsent) {
                service.decline();
            }
        }
        this.globalConsent = 'no';
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
    get unconsents() {
        const unconsents = [];
        for (const service of this.services) {
            if (service.consent == 'no') {
                unconsents.push(service.id);
            }
        }
        return unconsents;
    }
    loadTokenFromCookie() {
        const cookie = this._cookies.get(this._options.cookie.name);
        if (cookie === undefined) {
            this.noCookie = true;
            return;
        }
        this.noCookie = false;
        const [c, u] = cookie.split('!');
        for (const id of c.split('|')) {
            const service = this.findService(id);
            if (service) {
                service.accept();
            }
        }
        if (u) {
            for (const id of u.split('|')) {
                const service = this.findService(id);
                if (service) {
                    service.decline();
                }
            }
        }
    }
    get nbNeedConcentServices() {
        return (this.services.filter((s) => s.needConsent && s.consent == 'unknown')).length;
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
        this._cookies.set(this._options.cookie.name, this.consents.join('|') + '!' + this.unconsents.join('|'), options);
        (0, mobx_1.action)(() => {
            this.noCookie = false;
            this.newServiceSinceLastConsent = this.nbNeedConcentServices > 0;
        })();
    }
    normalize() {
        const data = {
            noCookie: this.noCookie,
            dialogIsOpened: this.dialogIsOpened,
        };
        return data;
    }
    denormalize(data) {
        (0, mobx_1.action)(() => {
            this.noCookie = data.noCookie;
            this.dialogIsOpened = data.dialogIsOpened;
        })();
    }
}
exports.Store = Store;
