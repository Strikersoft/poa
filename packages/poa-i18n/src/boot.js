"use strict";
exports.__esModule = true;
var i18next = require("i18next");
var core_1 = require("@poa/core");
function boot(config, componentsInjector) {
    return new Promise(function (resolve, reject) {
        i18next.init(config.i18n || {}, function (error, t) {
            if (error) {
                return reject(error);
            }
            core_1.ComponentsInjector.injectPropertyToAllComponents(function (component) {
                component.prototype.t = createTranslator(component.prototype.tNamespaces, t);
            });
            return resolve({ t: t, i18next: i18next });
        });
    });
}
exports.boot = boot;
function createTranslator(dicts, t) {
    if (dicts === void 0) { dicts = []; }
    function translator(value, opts) {
        return t(value, { ns: dicts.slice(), opts: opts });
    }
    return translator;
}
//# sourceMappingURL=boot.js.map