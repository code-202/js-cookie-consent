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
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const mobx_react_1 = require("mobx-react");
const reactstrap_1 = require("reactstrap");
const kernel_1 = require("@code-202/kernel");
const customize_1 = __importDefault(require("./customize"));
class Dialog extends React.Component {
    store;
    constructor(props) {
        super(props);
        this.store = (0, kernel_1.getKernel)().container.get(props.storeId !== undefined ? props.storeId : 'cookie-consent');
    }
    render() {
        const { className, header, body, footer } = this.props;
        const customize = (0, jsx_runtime_1.jsx)(customize_1.default, { ...this.props.customize });
        return (0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: (0, jsx_runtime_1.jsxs)(reactstrap_1.Modal, { isOpen: this.store.dialogIsOpened, centered: true, toggle: this.store.noCookie !== true ? () => this.store.toggleDialog() : undefined, className: className, children: [(0, jsx_runtime_1.jsx)(reactstrap_1.ModalHeader, { className: header?.className, toggle: this.store.noCookie !== true ? () => this.store.toggleDialog() : undefined, children: header?.content !== undefined ? header.content(this.store) : (this.store.newServiceSinceLastConsent ? 'New cookie from last consent !' : 'Cookie Consent ?') }), (0, jsx_runtime_1.jsx)(reactstrap_1.ModalBody, { className: body?.className, children: body?.content !== undefined ? body.content(this.store, customize) : (!this.store.customizing ? null : customize) }), (0, jsx_runtime_1.jsxs)(reactstrap_1.ModalFooter, { className: footer?.className, children: [(0, jsx_runtime_1.jsx)(reactstrap_1.Collapse, { isOpen: !this.store.customizing, className: footer?.collapse?.className !== undefined ? footer.collapse.className : 'w-100', children: (0, jsx_runtime_1.jsxs)("div", { className: footer?.collapse !== undefined ? footer.collapse.contentClassName : 'd-flex justify-content-between align-items-center', children: [(0, jsx_runtime_1.jsx)(reactstrap_1.Button, { color: footer?.acceptAll?.color !== undefined ? footer.acceptAll.color : 'primary', size: footer?.acceptAll?.size, outline: footer?.acceptAll?.outline !== undefined ? footer.acceptAll.outline : false, className: footer?.acceptAll?.className !== undefined ? footer.acceptAll.className : '', onClick: this.onAcceptClickHandler, children: footer?.acceptAll?.content !== undefined ? footer.acceptAll.content(this.store) : 'Accept all' }), (0, jsx_runtime_1.jsx)(reactstrap_1.Button, { color: footer?.declineAll?.color !== undefined ? footer.declineAll.color : 'dark', size: footer?.declineAll?.size, outline: footer?.declineAll?.outline !== undefined ? footer.declineAll.outline : true, className: footer?.declineAll?.className !== undefined ? footer.declineAll.className : '', onClick: this.onDeclineClickHandler, children: footer?.declineAll?.content !== undefined ? footer.declineAll.content(this.store) : 'Decline all' }), this.store.isCustomizable && ((0, jsx_runtime_1.jsx)(reactstrap_1.Button, { color: footer?.customize?.color !== undefined ? footer.customize.color : 'secondary', size: footer?.customize?.size, outline: footer?.customize?.outline !== undefined ? footer.customize.outline : false, className: footer?.customize?.className !== undefined ? footer.customize.className : '', onClick: this.onCustomizeClickHandler, children: footer?.customize?.content !== undefined ? footer.customize.content(this.store) : 'Customize' }))] }) }), (0, jsx_runtime_1.jsx)(reactstrap_1.Collapse, { isOpen: this.store.customizing, children: (0, jsx_runtime_1.jsx)(reactstrap_1.Button, { color: footer?.close?.color !== undefined ? footer.close.color : 'secondary', size: footer?.close?.size, outline: footer?.close?.outline !== undefined ? footer.close.outline : false, className: footer?.close?.className !== undefined ? footer.close.className : '', onClick: this.onCloseClickHandler, children: footer?.close?.content !== undefined ? footer.close.content(this.store) : 'Close' }) })] })] }) });
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
//# sourceMappingURL=dialog.js.map