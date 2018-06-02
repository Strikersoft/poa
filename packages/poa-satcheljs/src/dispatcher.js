"use strict";
exports.__esModule = true;
var actionCreator_1 = require("./actionCreator");
var globalContext_1 = require("./globalContext");
function subscribe(actionId, callback) {
    var subscriptions = globalContext_1.getGlobalContext().subscriptions;
    if (!subscriptions[actionId]) {
        subscriptions[actionId] = [];
    }
    subscriptions[actionId].push(callback);
}
exports.subscribe = subscribe;
function dispatch(actionMessage) {
    if (globalContext_1.getGlobalContext().inMutator) {
        throw new Error('Mutators cannot dispatch further actions.');
    }
    var dispatchWithMiddleware = globalContext_1.getGlobalContext().dispatchWithMiddleware || finalDispatch;
    return dispatchWithMiddleware(actionMessage);
}
exports.dispatch = dispatch;
function finalDispatch(actionMessage) {
    var actionId = actionCreator_1.getPrivateActionId(actionMessage);
    var subscribers = globalContext_1.getGlobalContext().subscriptions[actionId];
    if (subscribers) {
        var promises_1 = [];
        subscribers.forEach(function (subscriber) {
            var returnValue = subscriber(actionMessage);
            if (returnValue) {
                promises_1.push(returnValue);
            }
        });
        if (promises_1.length) {
            return promises_1.length === 1 ? promises_1[0] : Promise.all(promises_1);
        }
    }
}
exports.finalDispatch = finalDispatch;
//# sourceMappingURL=dispatcher.js.map