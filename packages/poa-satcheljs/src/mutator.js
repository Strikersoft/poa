"use strict";
exports.__esModule = true;
var mobx_1 = require("mobx");
var actionCreator_1 = require("./actionCreator");
var dispatcher_1 = require("./dispatcher");
var globalContext_1 = require("./globalContext");
function mutator(actionCreator, target) {
    var actionId = actionCreator_1.getPrivateActionId(actionCreator);
    if (!actionId) {
        throw new Error('Mutators can only subscribe to action creators.');
    }
    // Wrap the callback in a MobX action so it can modify the store
    var wrappedTarget = mobx_1.action(target);
    // Subscribe to the action
    dispatcher_1.subscribe(actionId, function (actionMessage) {
        try {
            globalContext_1.getGlobalContext().inMutator = true;
            if (wrappedTarget(actionMessage)) {
                throw new Error('Mutators cannot return a value and cannot be async.');
            }
        }
        finally {
            globalContext_1.getGlobalContext().inMutator = false;
        }
    });
    return target;
}
exports["default"] = mutator;
//# sourceMappingURL=mutator.js.map