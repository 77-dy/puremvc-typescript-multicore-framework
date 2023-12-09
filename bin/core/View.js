"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.View = void 0;
const Observer_1 = require("../patterns/observer/Observer");
class View {
    constructor(key) {
        if (View.instanceMap[key] != null)
            throw Error(View.MULTITON_MSG);
        this.multitonKey = key;
        View.instanceMap[key] = this;
        this.mediatorMap = {};
        this.observerMap = {};
        this.initializeView();
    }
    initializeView() {
    }
    registerObserver(notificationName, observer) {
        if (this.observerMap[notificationName] != null) {
            this.observerMap[notificationName].push(observer);
        }
        else {
            this.observerMap[notificationName] = [observer];
        }
    }
    notifyObservers(notification) {
        if (this.observerMap[notification.name] == null)
            return;
        let observers = this.observerMap[notification.name].slice();
        for (let i = 0; i < observers.length; i++) {
            observers[i].notifyObserver(notification);
        }
    }
    removeObserver(notificationName, notifyContext) {
        let observers = this.observerMap[notificationName];
        for (let i = 0; i < observers.length; i++) {
            if (observers[i].compareNotifyContext(notifyContext) == true) {
                observers.splice(i, 1);
                break;
            }
        }
        if (observers.length == 0) {
            delete this.observerMap[notificationName];
        }
    }
    registerMediator(mediator) {
        if (this.mediatorMap[mediator.name] != null)
            return;
        mediator.initializeNotifier(this.multitonKey);
        this.mediatorMap[mediator.name] = mediator;
        let interests = mediator.listNotificationInterests();
        if (interests.length > 0) {
            let observer = new Observer_1.Observer(mediator.handleNotification, mediator);
            for (let i = 0; i < interests.length; i++) {
                this.registerObserver(interests[i], observer);
            }
        }
        mediator.onRegister();
    }
    retrieveMediator(mediatorName) {
        return this.mediatorMap[mediatorName] || null;
    }
    hasMediator(mediatorName) {
        return this.mediatorMap[mediatorName] != null;
    }
    removeMediator(mediatorName) {
        let mediator = this.mediatorMap[mediatorName];
        if (mediator == null)
            return null;
        let interests = mediator.listNotificationInterests();
        for (let i = 0; i < interests.length; i++) {
            this.removeObserver(interests[i], mediator);
        }
        delete this.mediatorMap[mediatorName];
        mediator.onRemove();
        return mediator;
    }
    static getInstance(key, factory) {
        if (View.instanceMap[key] == null)
            View.instanceMap[key] = factory(key);
        return View.instanceMap[key];
    }
    static removeView(key) {
        delete View.instanceMap[key];
    }
    multitonKey;
    mediatorMap;
    observerMap;
    static instanceMap = {};
    static MULTITON_MSG = "View instance for this Multiton key already constructed!";
}
exports.View = View;
//# sourceMappingURL=View.js.map