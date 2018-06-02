"use strict";
exports.__esModule = true;
var tslib_1 = require("tslib");
var React = require("react");
var mobx_little_router_react_1 = require("mobx-little-router-react");
var PoaApp = /** @class */ (function (_super) {
    tslib_1.__extends(PoaApp, _super);
    function PoaApp() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    PoaApp.prototype.render = function () {
        return (React.createElement(mobx_little_router_react_1.RouterProvider, { router: this.props.router },
            React.createElement(mobx_little_router_react_1.Outlet, null)));
    };
    return PoaApp;
}(React.Component));
exports.PoaApp = PoaApp;
//# sourceMappingURL=app.js.map