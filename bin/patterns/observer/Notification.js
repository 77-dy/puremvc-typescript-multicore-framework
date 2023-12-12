"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Notification = void 0;
class Notification {
    _name;
    _body;
    _type;
    constructor(name, body, type) {
        this._name = name;
        this._body = body;
        this._type = type;
    }
    get name() {
        return this._name;
    }
    get body() {
        return this._body;
    }
    set body(body) {
        this._body = body;
    }
    get type() {
        return this._type;
    }
    set type(type) {
        this._type = type;
    }
    toString() {
        let msg = `Notification Name: ${this.name}`;
        msg += `\nBody: ${this.body ? this.body : 'null'}`;
        msg += `\nType: ${this.type ?? 'null'}`;
        return msg;
    }
}
exports.Notification = Notification;
//# sourceMappingURL=Notification.js.map