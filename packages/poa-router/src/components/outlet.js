"use strict";
exports.__esModule = true;
var tslib_1 = require("tslib");
var React = require("react");
var mobx_little_router_react_1 = require("mobx-little-router-react");
/**
 * Outlet component is responsible for rendering the matched components
 * from RouterStore into it. Each Outlet element renders it's current node index
 * in the path, and then provides the next index to subsequent Outlet components.
 *
 * <div>
 *  <Outlet name="main" />
 *  <Outlet name="sidebar" />
 * </div>
 *
 * @export
 * @param {OutletProps} props
 * @returns
 */
function Outlet(props) {
    return React.createElement(mobx_little_router_react_1.Outlet, tslib_1.__assign({}, props));
}
exports.Outlet = Outlet;
//# sourceMappingURL=outlet.js.map