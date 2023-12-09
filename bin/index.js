"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.puremvc = void 0;
const Controller_1 = require("./core/Controller");
const Model_1 = require("./core/Model");
const View_1 = require("./core/View");
const MacroCommand_1 = require("./patterns/command/MacroCommand");
const SimpleCommand_1 = require("./patterns/command/SimpleCommand");
const Facade_1 = require("./patterns/facade/Facade");
const Mediator_1 = require("./patterns/mediator/Mediator");
const Notification_1 = require("./patterns/observer/Notification");
const Notifier_1 = require("./patterns/observer/Notifier");
const Observer_1 = require("./patterns/observer/Observer");
const Proxy_1 = require("./patterns/proxy/Proxy");
exports.puremvc = {
    Controller: Controller_1.Controller, Model: Model_1.Model, View: View_1.View,
    SimpleCommand: SimpleCommand_1.SimpleCommand, MacroCommand: MacroCommand_1.MacroCommand, Facade: Facade_1.Facade, Mediator: Mediator_1.Mediator,
    Notification: Notification_1.Notification, Notifier: Notifier_1.Notifier, Observer: Observer_1.Observer, Proxy: Proxy_1.Proxy
};
//# sourceMappingURL=index.js.map