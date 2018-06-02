"use strict";
exports.__esModule = true;
var dispatcher_1 = require("./dispatcher");
var createActionId_1 = require("./createActionId");
function actionCreator(actionType, target) {
    return createActionCreator(actionType, false, target);
}
exports.actionCreator = actionCreator;
function action(actionType, target) {
    return createActionCreator(actionType, true, target);
}
exports.action = action;
function asyncAction(actionType, target) {
    return createActionCreator(actionType, true, target, true);
}
exports.asyncAction = asyncAction;
function asyncDispatch(actionMessage) {
    return Promise.resolve().then(function () { return dispatcher_1.dispatch(actionMessage); });
}
function createActionCreator(actionType, shouldDispatch, target, async) {
    var actionId = createActionId_1["default"]();
    var decoratedTarget = function createAction() {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        // Create the action message
        var actionMessage = target ? target.apply(null, args) : {};
        // Stamp the action type
        if (actionMessage.type) {
            throw new Error('Action creators should not include the type property.');
        }
        // Stamp the action message with the type and the private ID
        actionMessage.type = actionType;
        setPrivateActionId(actionMessage, actionId);
        if (shouldDispatch && async) {
            return asyncDispatch(actionMessage);
        }
        // Dispatch if necessary
        if (shouldDispatch) {
            dispatcher_1.dispatch(actionMessage);
        }
        return actionMessage;
    };
    // Stamp the action creator function with the private ID
    setPrivateActionId(decoratedTarget, actionId);
    return decoratedTarget;
}
function getPrivateActionId(target) {
    return target.__SATCHELJS_ACTION_ID;
}
exports.getPrivateActionId = getPrivateActionId;
function setPrivateActionId(target, actionId) {
    target.__SATCHELJS_ACTION_ID = actionId;
}
//# sourceMappingURL=actionCreator.js.map