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
exports.Launcher = void 0;
const React = __importStar(require("react"));
const mobx_react_1 = require("mobx-react");
const kernel_1 = require("@code-202/kernel");
class Launcher extends React.Component {
    store;
    constructor(props) {
        super(props);
        this.store = (0, kernel_1.getKernel)().container.get(props.storeId !== undefined ? props.storeId : 'cookie-consent');
    }
    render() {
        if (!this.props.alwaysShown && this.store.noCookie !== false) {
            return null;
        }
        return React.createElement(React.Fragment, null,
            React.createElement("button", { className: this.props.className !== undefined ? this.props.className : 'm-1 border-0', onClick: () => this.store.toggleDialog() }, this.props.content !== undefined ? this.props.content(this.store) : 'Manage cookie consent'));
    }
}
exports.Launcher = Launcher;
exports.default = (0, mobx_react_1.observer)(Launcher);
