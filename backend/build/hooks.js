"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var HookNames;
(function (HookNames) {
    HookNames["AfterStart"] = "afterStart";
    HookNames["BeforeMigrate"] = "beforeMigrate";
    HookNames["AfterMigrate"] = "afterMigrate";
})(HookNames || (HookNames = {}));
const hooks = [];
function registerHook(name, fn) {
    const existingHook = hooks.filter((hook) => hook.name === name);
    if (existingHook.length == 0) {
        hooks.push({ name, functions: [] });
    }
    hooks.find((hook) => hook.name === name).functions.push(fn);
}
function callHook(name, ...args) {
    return __awaiter(this, void 0, void 0, function* () {
        const hook = hooks.find((hook) => hook.name === name);
        if (!hook) {
            return;
        }
        for (const fn of hook.functions) {
            yield fn(...args);
        }
    });
}
// Test Functions
registerHook(HookNames.AfterStart, (args) => __awaiter(void 0, void 0, void 0, function* () {
    console.log('Application up and running!');
}));
registerHook(HookNames.BeforeMigrate, () => __awaiter(void 0, void 0, void 0, function* () {
    console.log('Connecting to db...'); // Example function 1
}));
registerHook(HookNames.AfterMigrate, () => __awaiter(void 0, void 0, void 0, function* () {
    console.log('Connections sucessful');
    console.log('Db migration completed!');
}));
// Calling the Test Functions with empty object passed in
callHook(HookNames.AfterStart, {});
callHook(HookNames.BeforeMigrate, {});
callHook(HookNames.AfterMigrate, {});
module.exports = { registerHook, callHook };
