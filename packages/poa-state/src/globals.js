"use strict";
exports.__esModule = true;
var satcheljs_1 = require("@poa/satcheljs");
var mobx_1 = require("mobx");
var currentStore = {};
var currentEnvironment = {};
var currentActions = {};
var middlewares = [];
function setEnv(newEnv) {
    currentEnvironment = newEnv;
    return getEnv();
}
exports.setEnv = setEnv;
function getEnv() {
    return currentEnvironment;
}
exports.getEnv = getEnv;
function setStore(newStore) {
    currentStore = newStore;
}
exports.setStore = setStore;
function getStore() {
    return currentStore;
}
exports.getStore = getStore;
function setActions(newActions) {
    currentActions = newActions;
    return getActions();
}
exports.setActions = setActions;
function getActions() {
    return currentActions;
}
exports.getActions = getActions;
function addMiddleware() {
    var mds = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        mds[_i] = arguments[_i];
    }
    middlewares.push.apply(middlewares, mds);
}
exports.addMiddleware = addMiddleware;
function getMiddlewares() {
    return middlewares;
}
exports.getMiddlewares = getMiddlewares;
function selector(fn) {
    return mobx_1.computed(function () { return fn(getStore()); });
}
exports.selector = selector;
function resetGlobals() {
    setActions({});
    setStore({});
    setEnv({});
    middlewares = [];
    satcheljs_1.__resetGlobalContext();
}
exports.resetGlobals = resetGlobals;
//# sourceMappingURL=globals.js.map