"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Controller = void 0;
const View_1 = require("./View");
const Observer_1 = require("../patterns/observer/Observer");
class Controller {
    constructor(key) {
        if (Controller.instanceMap[key] != null)
            throw Error(Controller.MULTITON_MSG);
        this.multitonKey = key;
        Controller.instanceMap[key] = this;
        this.commandMap = {};
        this.initializeController();
    }
    initializeController() {
        this.view = View_1.View.getInstance(this.multitonKey, (key) => new View_1.View(key));
    }
    registerCommand(notificationName, factory) {
        if (this.commandMap[notificationName] == null) {
            this.view.registerObserver(notificationName, new Observer_1.Observer(this.executeCommand, this));
        }
        this.commandMap[notificationName] = factory;
    }
    executeCommand(notification) {
        let factory = this.commandMap[notification.name];
        if (factory == null)
            return;
        let command = factory();
        command.initializeNotifier(this.multitonKey);
        command.execute(notification);
    }
    hasCommand(notificationName) {
        return this.commandMap[notificationName] != null;
    }
    removeCommand(notificationName) {
        if (this.hasCommand(notificationName)) {
            this.view.removeObserver(notificationName, this);
            delete this.commandMap[notificationName];
        }
    }
    static getInstance(key, factory) {
        if (Controller.instanceMap[key] == null)
            Controller.instanceMap[key] = factory(key);
        return Controller.instanceMap[key];
    }
    static removeController(key) {
        delete Controller.instanceMap[key];
    }
    view;
    multitonKey;
    commandMap;
    static instanceMap = {};
    static MULTITON_MSG = "Controller instance for this Multiton key already constructed!";
}
exports.Controller = Controller;
//# sourceMappingURL=Controller.js.map