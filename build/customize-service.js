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
        const { store, service } = this.props;
        return React.createElement(React.Fragment, null,
            React.createElement("div", { className: "d-flex justify-content-between" },
                this.renderServiceName(),
                React.createElement("div", null, service.needConsent ? (React.createElement(React.Fragment, null,
                    this.renderAccept(),
                    this.renderDecline())) : (this.renderNoNeedConcent()))));
    }
    renderServiceName() {
        return React.createElement("span", null,
            this.props.service.id,
            " (",
            this.props.service.cookies?.join(', '),
            ")");
    }
    renderAccept() {
        return React.createElement(reactstrap_1.Button, { color: "primary", outline: this.props.service.consent != 'yes', onClick: () => this.props.store.accept(this.props.service.id) }, this.renderAcceptContent(this.props.service.consent));
    }
    renderAcceptContent(choice) {
        return 'Accept';
    }
    renderDecline() {
        return React.createElement(reactstrap_1.Button, { color: "primary", outline: this.props.service.consent != 'no', onClick: () => this.props.store.decline(this.props.service.id), className: "ms-2" }, this.renderDeclineContent(this.props.service.consent));
    }
    renderDeclineContent(choice) {
        return 'Decline';
    }
    renderNoNeedConcent() {
        return 'Required';
    }
}
exports.default = (0, mobx_react_1.observer)(CustomizeService);
