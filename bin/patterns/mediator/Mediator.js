"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Mediator = void 0;
const Notifier_1 = require("../observer/Notifier");
class Mediator extends Notifier_1.Notifier {
    _name;
    _viewComponent;
    constructor(name, viewComponent) {
        super();
        this._name = name || Mediator.NAME;
        this._viewComponent = viewComponent;
    }
    onRegister() {
    }
    onRemove() {
    }
    listNotificationInterests() {
        return [];
    }
    handleNotification(notification) {
    }
    get name() {
        return this._name;
    }
    get viewComponent() {
        return this._viewComponent;
    }
    set viewComponent(viewComponent) {
        this._viewComponent = viewComponent;
    }
    static NAME = 'Mediator';
}
exports.Mediator = Mediator;
//# sourceMappingURL=Mediator.js.map