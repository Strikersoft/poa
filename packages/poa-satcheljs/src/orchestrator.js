"use strict";
exports.__esModule = true;
var actionCreator_1 = require("./actionCreator");
var dispatcher_1 = require("./dispatcher");
function orchestrator(actionCreator, target) {
    var actionId = actionCreator_1.getPrivateActionId(actionCreator);
    if (!actionId) {
        throw new Error('Orchestrators can only subscribe to action creators.');
    }
    dispatcher_1.subscribe(actionId, target);
    return target;
}
exports["default"] = orchestrator;
//# sourceMappingURL=orchestrator.js.map