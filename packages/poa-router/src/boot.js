"use strict";
exports.__esModule = true;
var tslib_1 = require("tslib");
var core_1 = require("@poa/core");
var history_1 = require("history");
var mobx_little_router_react_1 = require("mobx-little-router-react");
function installRouter(config) {
    return mobx_little_router_react_1.install(config);
}
function createRouterInstallConfig(config, injectionData) {
    var routerConfig = config.router;
    var getContext = function () {
        if (routerConfig.context) {
            return Object.assign({}, routerConfig.context(), injectionData);
        }
        return injectionData;
    };
    switch (routerConfig.type) {
        case 'hash':
            return { history: history_1.createHashHistory(), routes: routerConfig.routes, getContext: getContext };
        case 'memory':
            return { history: history_1.createMemoryHistory(), routes: routerConfig.routes, getContext: getContext };
        default:
            return { history: history_1.createBrowserHistory(), routes: routerConfig.routes, getContext: getContext };
    }
}
var installedRouter;
function getRouter() {
    return installedRouter;
}
exports.getRouter = getRouter;
function boot(config, injectionData, componentsInjector) {
    if (injectionData === void 0) { injectionData = {}; }
    return tslib_1.__awaiter(this, void 0, void 0, function () {
        var routerConfig;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    routerConfig = createRouterInstallConfig(config, injectionData);
                    installedRouter = installRouter(routerConfig);
                    return [4 /*yield*/, startRouter(installedRouter)];
                case 1:
                    _a.sent();
                    // inject router to all registered components
                    core_1.ComponentsInjector.injectPropertyToAllComponents(function (component) {
                        component.prototype.router = getRouter();
                    });
                    return [2 /*return*/, { router: installedRouter, history: routerConfig.history }];
            }
        });
    });
}
exports.boot = boot;
function startRouter(router) {
    return new Promise(function (resolve) { return router.start(resolve); });
}
exports.startRouter = startRouter;
//# sourceMappingURL=boot.js.map