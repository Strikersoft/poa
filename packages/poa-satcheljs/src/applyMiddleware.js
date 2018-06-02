"use strict";
exports.__esModule = true;
var dispatcher_1 = require("./dispatcher");
var globalContext_1 = require("./globalContext");
function applyMiddleware() {
    var middleware = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        middleware[_i] = arguments[_i];
    }
    var next = dispatcher_1.finalDispatch;
    for (var i = middleware.length - 1; i >= 0; i--) {
        next = applyNextMiddleware(middleware[i], next);
    }
    globalContext_1.getGlobalContext().dispatchWithMiddleware = next;
}
exports["default"] = applyMiddleware;
function applyNextMiddleware(middleware, next) {
    return function (actionMessage) { return middleware(next, actionMessage); };
}
//# sourceMappingURL=applyMiddleware.js.map