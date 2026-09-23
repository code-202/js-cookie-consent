"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const mobx_react_1 = require("mobx-react");
const reactstrap_1 = require("reactstrap");
class CustomizeService extends React.Component {
    render() {
        const { store, service, className, name, accept, decline, noNeedConsent } = this.props;
        return (0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: (0, jsx_runtime_1.jsxs)("div", { className: className !== undefined ? className(service) : 'd-flex justify-content-between', children: [name !== undefined ? name(service) : (0, jsx_runtime_1.jsxs)("span", { children: [service.id, " (", service.cookies?.join(', '), ")"] }), (0, jsx_runtime_1.jsx)("div", { children: service.needConsent ? ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)(reactstrap_1.Button, { color: accept?.color !== undefined ? accept.color(service) : 'primary', size: accept?.size?.(service), outline: accept?.outline !== undefined ? accept.outline(service) : service.consent != 'yes', className: accept?.className !== undefined ? accept.className(service) : '', onClick: () => store.accept(service.id), children: accept?.content !== undefined ? accept.content(service) : 'Accept' }), (0, jsx_runtime_1.jsx)(reactstrap_1.Button, { color: decline?.color !== undefined ? decline.color(service) : 'primary', size: decline?.size?.(service), outline: decline?.outline !== undefined ? decline.outline(service) : service.consent != 'no', className: decline?.className !== undefined ? decline.className(service) : 'ms-2', onClick: () => store.decline(service.id), children: decline?.content !== undefined ? decline.content(service) : 'Decline' })] })) : (noNeedConsent !== undefined ? noNeedConsent(service) : 'Required') })] }) });
    }
}
exports.default = (0, mobx_react_1.observer)(CustomizeService);
//# sourceMappingURL=customize-service.js.map