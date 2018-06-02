"use strict";
exports.__esModule = true;
var globalContext_1 = require("./globalContext");
function createActionId() {
    return (globalContext_1.getGlobalContext().nextActionId++).toString();
}
exports["default"] = createActionId;
//# sourceMappingURL=createActionId.js.map