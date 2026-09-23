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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const mobx_react_1 = require("mobx-react");
const reactstrap_1 = require("reactstrap");
const customize_service_1 = __importDefault(require("./customize-service"));
class CustomizeType extends React.Component {
    render() {
        const { store, type, className, name, acceptAll, declineAll, noNeedConsent } = this.props;
        return (0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsxs)("div", { className: className !== undefined ? className(type) : 'd-flex justify-content-between align-items-center border-top py-2', children: [(0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)(reactstrap_1.Button, { color: name?.btn?.color !== undefined ? name.btn.color(type) : 'primary', size: name?.btn?.size?.(type), outline: name?.btn?.outline !== undefined ? name.btn.outline(type) : type.expanded, className: name?.btn?.className !== undefined ? name.btn.className(type) : 'me-2', onClick: () => store.toggleType(type.id), children: name?.btn?.content !== undefined ? name.btn.content(type) : '+' }), name?.content !== undefined ? name.content(type) : type.id] }), (0, jsx_runtime_1.jsx)("div", { children: type.needConsent ? ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)(reactstrap_1.Button, { color: acceptAll?.color !== undefined ? acceptAll.color(type) : 'primary', size: acceptAll?.size?.(type), outline: acceptAll?.outline !== undefined ? acceptAll.outline(type) : type.choice != 'yes', className: acceptAll?.className !== undefined ? acceptAll.className(type) : '', onClick: () => store.acceptType(type.id), children: acceptAll?.content !== undefined ? acceptAll.content(type) : 'Accept all' }), (0, jsx_runtime_1.jsx)(reactstrap_1.Button, { color: declineAll?.color !== undefined ? declineAll.color(type) : 'primary', size: declineAll?.size?.(type), outline: declineAll?.outline !== undefined ? declineAll.outline(type) : type.choice != 'no', className: declineAll?.className !== undefined ? declineAll.className(type) : 'ms-2', onClick: () => store.declineType(type.id), children: declineAll?.content !== undefined ? declineAll.content(type) : 'Decline all' })] })) : (noNeedConsent !== undefined ? noNeedConsent(type) : 'Required') })] }), (0, jsx_runtime_1.jsx)(reactstrap_1.Collapse, { isOpen: type.expanded, children: (0, jsx_runtime_1.jsx)(reactstrap_1.ListGroup, { flush: true, children: type.services.map((service) => ((0, react_1.createElement)(customize_service_1.default, { ...this.props.service, key: service.id, service: service, store: store }))) }) })] });
    }
}
exports.default = (0, mobx_react_1.observer)(CustomizeType);
//# sourceMappingURL=customize-type.js.map