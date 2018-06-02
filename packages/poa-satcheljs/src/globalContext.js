"use strict";
exports.__esModule = true;
var mobx_1 = require("mobx");
var schemaVersion = 3;
// A reset global context function to be used INTERNALLY by SatchelJS tests and for initialization ONLY
function __resetGlobalContext() {
    global.__poaSatchelGlobalContext = {
        schemaVersion: schemaVersion,
        rootStore: mobx_1.observable.map({}),
        nextActionId: 0,
        subscriptions: {},
        dispatchWithMiddleware: null,
        inMutator: false
    };
}
exports.__resetGlobalContext = __resetGlobalContext;
function ensureGlobalContextSchemaVersion() {
    if (schemaVersion !== global.__poaSatchelGlobalContext.schemaVersion) {
        throw new Error('Detected incompatible SatchelJS versions loaded.');
    }
}
exports.ensureGlobalContextSchemaVersion = ensureGlobalContextSchemaVersion;
function getGlobalContext() {
    return global.__poaSatchelGlobalContext;
}
exports.getGlobalContext = getGlobalContext;
// Side Effects: actually initialize the global context if it is undefined
if (!global.__poaSatchelGlobalContext) {
    __resetGlobalContext();
}
else {
    ensureGlobalContextSchemaVersion();
}
//# sourceMappingURL=globalContext.js.map