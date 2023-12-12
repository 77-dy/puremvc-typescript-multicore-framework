"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Observer = void 0;
class Observer {
    _notifyMethod;
    _notifyContext;
    constructor(notifyMethod, notifyContext) {
        this._notifyMethod = notifyMethod;
        this._notifyContext = notifyContext;
    }
    set notifyMethod(notifyMethod) {
        this._notifyMethod = notifyMethod;
    }
    get notifyMethod() {
        return this._notifyMethod;
    }
    set notifyContext(notifyContext) {
        this._notifyContext = notifyContext;
    }
    get notifyContext() {
        return this._notifyContext;
    }
    notifyObserver(notification) {
        this.notifyMethod?.call(this.notifyContext, notification);
    }
    compareNotifyContext(object) {
        return object == this.notifyContext;
    }
}
exports.Observer = Observer;
//# sourceMappingURL=Observer.js.map