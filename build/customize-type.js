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
const customize_service_1 = __importDefault(require("./customize-service"));
class CustomizeType extends React.Component {
    render() {
        const { store, type } = this.props;
        return React.createElement(React.Fragment, null,
            React.createElement("div", { className: "d-flex justify-content-between" },
                this.renderTypeName(),
                React.createElement("div", null, type.needConsent ? (React.createElement(React.Fragment, null,
                    this.renderAcceptAll(),
                    this.renderDeclineAll())) : (this.renderNoNeedConcent()))),
            React.createElement(reactstrap_1.Collapse, { isOpen: type.expanded },
                React.createElement(reactstrap_1.ListGroup, { flush: true }, type.services.map((service) => this.renderService(service)))));
    }
    renderTypeName() {
        return React.createElement("span", null, this.props.type.id);
    }
    renderAcceptAll() {
        return React.createElement(reactstrap_1.Button, { color: "primary", outline: this.props.type.choice != 'yes', onClick: () => this.props.store.acceptType(this.props.type.id) }, this.renderAcceptAllContent(this.props.type.choice));
    }
    renderAcceptAllContent(choice) {
        return 'Accept all';
    }
    renderDeclineAll() {
        return React.createElement(reactstrap_1.Button, { color: "primary", outline: this.props.type.choice != 'no', onClick: () => this.props.store.declineType(this.props.type.id) }, this.renderDeclineAllContent(this.props.type.choice));
    }
    renderDeclineAllContent(choice) {
        return 'Decline all';
    }
    renderService(service) {
        return React.createElement(customize_service_1.default, { key: service.id, service: service, store: this.props.store });
    }
    renderNoNeedConcent() {
        return 'Required';
    }
}
exports.default = (0, mobx_react_1.observer)(CustomizeType);
