"use strict";
exports.__esModule = true;
var globals_1 = require("./globals");
var satcheljs_1 = require("@poa/satcheljs");
var router_1 = require("@poa/router");
function createInitialStore(state) {
    globals_1.setStore(satcheljs_1.createStore('poaStore', state)());
    return globals_1.getStore();
}
exports.createInitialStore = createInitialStore;
function createAction(actionType, target) {
    return satcheljs_1.asyncAction(actionType, target);
}
exports.createAction = createAction;
function addMutator(actionCreator, target) {
    return satcheljs_1.mutator(actionCreator, function (actionMessage) {
        target(actionMessage, { store: globals_1.getStore() });
    });
}
exports.addMutator = addMutator;
function addSideEffects(actionCreator, target) {
    return satcheljs_1.orchestrator(actionCreator, function (actionMessage) {
        return target(actionMessage, {
            actions: globals_1.getActions(),
            env: globals_1.getEnv(),
            store: globals_1.getStore(),
            router: router_1.getRouter()
        });
    });
}
exports.addSideEffects = addSideEffects;
//# sourceMappingURL=wrappers.js.map