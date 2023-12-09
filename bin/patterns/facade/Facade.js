"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Facade = void 0;
const Controller_1 = require("../../core/Controller");
const Model_1 = require("../../core/Model");
const View_1 = require("../../core/View");
const Notification_1 = require("../observer/Notification");
class Facade {
    constructor(key) {
        if (Facade.instanceMap[key] != null)
            throw Error(Facade.MULTITON_MSG);
        this.initializeNotifier(key);
        Facade.instanceMap[key] = this;
        this.initializeFacade();
    }
    initializeFacade() {
        this.initializeModel();
        this.initializeController();
        this.initializeView();
    }
    initializeModel() {
        if (this.model != null)
            return;
        this.model = Model_1.Model.getInstance(this.multitonKey, (key) => new Model_1.Model(key));
    }
    initializeController() {
        if (this.controller != null)
            return;
        this.controller = Controller_1.Controller.getInstance(this.multitonKey, (key) => new Controller_1.Controller(key));
    }
    initializeView() {
        if (this.view != null)
            return;
        this.view = View_1.View.getInstance(this.multitonKey, (key) => new View_1.View(key));
    }
    registerCommand(notificationName, factory) {
        this.controller.registerCommand(notificationName, factory);
    }
    hasCommand(notificationName) {
        return this.controller.hasCommand(notificationName);
    }
    removeCommand(notificationName) {
        this.controller.removeCommand(notificationName);
    }
    registerProxy(proxy) {
        this.model.registerProxy(proxy);
    }
    retrieveProxy(proxyName) {
        return this.model.retrieveProxy(proxyName);
    }
    hasProxy(proxyName) {
        return this.model.hasProxy(proxyName);
    }
    removeProxy(proxyName) {
        return this.model.removeProxy(proxyName);
    }
    registerMediator(mediator) {
        this.view.registerMediator(mediator);
    }
    retrieveMediator(mediatorName) {
        return this.view.retrieveMediator(mediatorName);
    }
    hasMediator(mediatorName) {
        return this.view.hasMediator(mediatorName);
    }
    removeMediator(mediatorName) {
        return this.view.removeMediator(mediatorName);
    }
    notifyObservers(notification) {
        this.view.notifyObservers(notification);
    }
    sendNotification(notificationName, body, type) {
        this.notifyObservers(new Notification_1.Notification(notificationName, body, type));
    }
    initializeNotifier(key) {
        this.multitonKey = key;
    }
    static getInstance(key, factory) {
        if (Facade.instanceMap[key] == null)
            Facade.instanceMap[key] = factory(key);
        return Facade.instanceMap[key];
    }
    static hasCore(key) {
        return this.instanceMap[key] != null;
    }
    static removeCore(key) {
        if (this.instanceMap[key] == null)
            return;
        Model_1.Model.removeModel(key);
        View_1.View.removeView(key);
        Controller_1.Controller.removeController(key);
        delete this.instanceMap[key];
    }
    controller;
    model;
    view;
    multitonKey;
    static instanceMap = {};
    static MULTITON_MSG = "Facade instance for this Multiton key already constructed!";
}
exports.Facade = Facade;
//# sourceMappingURL=Facade.js.map