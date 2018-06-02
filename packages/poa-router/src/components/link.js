"use strict";
exports.__esModule = true;
var tslib_1 = require("tslib");
var React = require("react");
var mobx_little_router_react_1 = require("mobx-little-router-react");
/**
 * Component that helps to navigate in your react
 * Example: <Link path="/new-home" />
 *
 * @export
 * @param {LinkProps} props
 * @returns
 */
function Link(props) {
    return React.createElement(mobx_little_router_react_1.Link, tslib_1.__assign({}, props));
}
exports.Link = Link;
//# sourceMappingURL=link.js.map