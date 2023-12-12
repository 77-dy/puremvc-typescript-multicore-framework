"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Proxy = void 0;
const Notifier_1 = require("../observer/Notifier");
class Proxy extends Notifier_1.Notifier {
    _name;
    _data;
    constructor(name, data) {
        super();
        this._name = name || Proxy.NAME;
        this._data = data;
    }
    onRegister() {
    }
    onRemove() {
    }
    get name() {
        return this._name;
    }
    get data() {
        return this._data;
    }
    set data(data) {
        this._data = data;
    }
    static NAME = 'Proxy';
}
exports.Proxy = Proxy;
//# sourceMappingURL=Proxy.js.map