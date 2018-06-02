"use strict";
exports.__esModule = true;
var globalContext_1 = require("./globalContext");
/**
 * Satchel-provided root store getter
 */
function getRootStore() {
    return globalContext_1.getGlobalContext().rootStore;
}
exports["default"] = getRootStore;
//# sourceMappingURL=getRootStore.js.map