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
        this.model = Model_1.Model.getInstance(this.multitonKey, (key) => new Model_1.Model(key));
    }
    initializeController() {
        this.controller = Controller_1.Controller.getInstance(this.multitonKey, (key) => new Controller_1.Controller(key));
    }
    initializeView() {
        this.view = View_1.View.getInstance(this.multitonKey, (key) => new View_1.View(key));
    }
    registerCommand(notificationName, factory) {
        this.controller?.registerCommand(notificationName, factory);
    }
    hasCommand(notificationName) {
        return this.controller?.hasCommand(notificationName) ?? false;
    }
    removeCommand(notificationName) {
        this.controller?.removeCommand(notificationName);
    }
    registerProxy(proxy) {
        this.model?.registerProxy(proxy);
    }
    retrieveProxy(proxyName) {
        return this.model?.retrieveProxy(proxyName) ?? null;
    }
    hasProxy(proxyName) {
        return this.model?.hasProxy(proxyName) ?? false;
    }
    removeProxy(proxyName) {
        return this.model?.removeProxy(proxyName) ?? null;
    }
    registerMediator(mediator) {
        this.view?.registerMediator(mediator);
    }
    retrieveMediator(mediatorName) {
        return this.view?.retrieveMediator(mediatorName) ?? null;
    }
    hasMediator(mediatorName) {
        return this.view?.hasMediator(mediatorName) ?? false;
    }
    removeMediator(mediatorName) {
        return this.view?.removeMediator(mediatorName) ?? null;
    }
    notifyObservers(notification) {
        this.view?.notifyObservers(notification);
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
    static MULTITON_MSG = 'Facade instance for this Multiton key already constructed!';
}
exports.Facade = Facade;
//# sourceMappingURL=Facade.js.map