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
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const React = __importStar(require("react"));
const mobx_react_1 = require("mobx-react");
const reactstrap_1 = require("reactstrap");
class CustomizeService extends React.Component {
    render() {
        const { store, service, className, name, acceptAll, declineAll, noNeedConsent } = this.props;
        return React.createElement(React.Fragment, null,
            React.createElement("div", { className: className !== undefined ? className(service) : 'd-flex justify-content-between' },
                name !== undefined ? name(service) : React.createElement("span", null,
                    service.id,
                    " (",
                    service.cookies?.join(', '),
                    ")"),
                React.createElement("div", null, service.needConsent ? (React.createElement(React.Fragment, null,
                    React.createElement(reactstrap_1.Button, { color: acceptAll?.color !== undefined ? acceptAll.color(service) : 'primary', size: acceptAll?.size?.(service), outline: acceptAll?.outline !== undefined ? acceptAll.outline(service) : service.consent != 'yes', className: acceptAll?.className !== undefined ? acceptAll.className(service) : '', onClick: () => store.accept(service.id) }, acceptAll?.content !== undefined ? acceptAll.content(service) : 'Accept'),
                    React.createElement(reactstrap_1.Button, { color: declineAll?.color !== undefined ? declineAll.color(service) : 'primary', size: declineAll?.size?.(service), outline: declineAll?.outline !== undefined ? declineAll.outline(service) : service.consent != 'no', className: declineAll?.className !== undefined ? declineAll.className(service) : 'ms-2', onClick: () => store.decline(service.id) }, declineAll?.content !== undefined ? declineAll.content(service) : 'Decline'))) : (noNeedConsent !== undefined ? noNeedConsent(service) : 'Required'))));
    }
}
exports.default = (0, mobx_react_1.observer)(CustomizeService);
