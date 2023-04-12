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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const React = __importStar(require("react"));
const mobx_react_1 = require("mobx-react");
const reactstrap_1 = require("reactstrap");
const kernel_1 = require("@code-202/kernel");
const customize_1 = __importDefault(require("./customize"));
class Dialog extends React.Component {
    store;
    constructor(props) {
        super(props);
        this.store = (0, kernel_1.getKernel)().container.get('cookie-consent');
    }
    render() {
        return React.createElement(React.Fragment, null,
            React.createElement(reactstrap_1.Modal, { isOpen: this.store.dialogIsOpened, centered: true, toggle: this.store.noCookie !== true ? () => this.store.toggleDialog() : undefined },
                React.createElement(reactstrap_1.ModalHeader, { className: "cookie-consent-dialog-body", toggle: this.store.noCookie !== true ? () => this.store.toggleDialog() : undefined }, this.renderModalHeader()),
                React.createElement(reactstrap_1.ModalBody, { className: "cookie-consent-dialog-body" }, this.renderModalBody()),
                React.createElement(reactstrap_1.ModalFooter, { className: "cookie-consent-dialog-footer" },
                    React.createElement(reactstrap_1.Collapse, { isOpen: !this.store.customizing },
                        React.createElement("div", { className: "w-100 d-flex justify-content-between" },
                            React.createElement("button", { onClick: this.onAcceptClickHandler, className: "cookie-consent-dialog-btn-accept" }, this.renderButtonAcceptAll()),
                            React.createElement("button", { onClick: this.onDeclineClickHandler, className: "cookie-consent-dialog-btn-decline" }, this.renderButtonDeclineAll()),
                            this.store.isCustomizable && (React.createElement("button", { onClick: this.onCustomizeClickHandler, className: "cookie-consent-dialog-btn-customize" }, this.renderButtonCustomize())))),
                    React.createElement(reactstrap_1.Collapse, { isOpen: this.store.customizing },
                        React.createElement("button", { onClick: this.onCloseClickHandler, className: "cookie-consent-dialog-btn-close" }, this.renderButtonClose())))));
    }
    renderModalHeader() {
        return this.store.newServiceSinceLastConsent ? 'New cookie from last consent !' : 'Cookie Consent ?';
    }
    renderModalBody() {
        if (!this.store.customizing) {
            return null;
        }
        return React.createElement(customize_1.default, null);
    }
    renderButtonAcceptAll() {
        return 'Accept all';
    }
    renderButtonDeclineAll() {
        return 'Decline all';
    }
    renderButtonCustomize() {
        return 'Customize';
    }
    renderButtonClose() {
        return 'Close';
    }
    onDeclineClickHandler = () => {
        this.store.declineAll();
    };
    onAcceptClickHandler = () => {
        this.store.acceptAll();
    };
    onCustomizeClickHandler = () => {
        this.store.toggleCustomize();
    };
    onCloseClickHandler = () => {
        if (this.store.isClosable) {
            this.store.toggleDialog();
        }
        else {
            this.store.toggleCustomize();
        }
    };
}
exports.default = (0, mobx_react_1.observer)(Dialog);
