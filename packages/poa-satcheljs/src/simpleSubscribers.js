"use strict";
exports.__esModule = true;
var actionCreator_1 = require("./actionCreator");
var mutator_1 = require("./mutator");
var orchestrator_1 = require("./orchestrator");
function createSimpleSubscriber(decorator) {
    return function simpleSubscriber(actionType, target) {
        // Create the action creator
        var simpleActionCreator = actionCreator_1.action(actionType, function simpleActionCreator() {
            return {
                args: arguments
            };
        });
        // Create the subscriber
        decorator(simpleActionCreator, function simpleSubscriberCallback(actionMessage) {
            target.apply(null, actionMessage.args);
        });
        // Return a function that dispatches that action
        return simpleActionCreator;
    };
}
exports.createSimpleSubscriber = createSimpleSubscriber;
exports.mutatorAction = createSimpleSubscriber(mutator_1["default"]);
exports.orchestratorAction = createSimpleSubscriber(orchestrator_1["default"]);
//# sourceMappingURL=simpleSubscribers.js.map