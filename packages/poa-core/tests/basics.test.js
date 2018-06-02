"use strict";
var _this = this;
exports.__esModule = true;
var tslib_1 = require("tslib");
var boot_1 = require("../src/boot");
describe('Booting', function () {
    it('just boots without errors', function (done) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
        var e_1;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, boot_1.boot()];
                case 1:
                    _a.sent();
                    done();
                    return [3 /*break*/, 3];
                case 2:
                    e_1 = _a.sent();
                    fail(e_1);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    }); });
});
//# sourceMappingURL=basics.test.js.map