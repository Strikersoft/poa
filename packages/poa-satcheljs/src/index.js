"use strict";
exports.__esModule = true;
var mobx_1 = require("mobx");
var actionCreator_1 = require("./actionCreator");
exports.action = actionCreator_1.action;
exports.actionCreator = actionCreator_1.actionCreator;
exports.asyncAction = actionCreator_1.asyncAction;
var applyMiddleware_1 = require("./applyMiddleware");
exports.applyMiddleware = applyMiddleware_1["default"];
var createStore_1 = require("./createStore");
exports.createStore = createStore_1["default"];
var dispatcher_1 = require("./dispatcher");
exports.dispatch = dispatcher_1.dispatch;
var mutator_1 = require("./mutator");
exports.mutator = mutator_1["default"];
var orchestrator_1 = require("./orchestrator");
exports.orchestrator = orchestrator_1["default"];
var getRootStore_1 = require("./getRootStore");
exports.getRootStore = getRootStore_1["default"];
var simpleSubscribers_1 = require("./simpleSubscribers");
exports.mutatorAction = simpleSubscribers_1.mutatorAction;
exports.orchestratorAction = simpleSubscribers_1.orchestratorAction;
var globalContext_1 = require("./globalContext");
exports.__resetGlobalContext = globalContext_1.__resetGlobalContext;
function useStrict(enforceActions) {
    if (enforceActions === void 0) { enforceActions = 'strict'; }
    mobx_1.configure({ enforceActions: enforceActions });
}
exports.useStrict = useStrict;
useStrict();
//# sourceMappingURL=index.js.map