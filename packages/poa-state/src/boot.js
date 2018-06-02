"use strict";
exports.__esModule = true;
var tslib_1 = require("tslib");
var globals_1 = require("./globals");
var wrappers_1 = require("./wrappers");
var satcheljs_1 = require("@poa/satcheljs");
var core_1 = require("@poa/core");
// Pre-built actions
exports.initAction = wrappers_1.createAction('@@INIT', function () { return ({}); });
/**
 * @private
 * @param {*} config
 * @param {*} componentsInjector
 */
function boot(config, componentsInjector) {
    return tslib_1.__awaiter(this, void 0, void 0, function () {
        var store, actions, env;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    store = wrappers_1.createInitialStore(config.state.initial);
                    actions = globals_1.setActions(config.state.actions);
                    env = globals_1.setEnv(config.env);
                    // inject store, actions and environment to all registered components
                    core_1.ComponentsInjector.injectPropertyToAllComponents(function (component) {
                        component.prototype.store = globals_1.getStore();
                        component.prototype.actions = globals_1.getActions();
                        component.prototype.env = globals_1.getEnv();
                    });
                    // apply middlewares
                    globals_1.getMiddlewares().forEach(function (middleware) {
                        return satcheljs_1.applyMiddleware(middleware(globals_1.getStore()));
                    });
                    return [4 /*yield*/, exports.initAction()];
                case 1:
                    _a.sent();
                    return [2 /*return*/, { store: store, actions: actions, env: env }];
            }
        });
    });
}
exports.boot = boot;
//# sourceMappingURL=boot.js.map