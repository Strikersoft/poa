"use strict";
exports.__esModule = true;
var mobx_1 = require("mobx");
var getRootStore_1 = require("./getRootStore");
var createStoreAction = mobx_1.action('createStore', function createStoreAction(key, initialState) {
    getRootStore_1["default"]().set(key, initialState);
});
function createStore(key, initialState) {
    createStoreAction(key, initialState);
    // tslint:disable-next-line:no-angle-bracket-type-assertion
    return function () { return getRootStore_1["default"]().get(key); };
}
exports["default"] = createStore;
//# sourceMappingURL=createStore.js.map