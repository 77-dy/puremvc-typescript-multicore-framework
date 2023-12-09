"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Model = void 0;
class Model {
    constructor(key) {
        if (Model.instanceMap[key] != null)
            throw Error(Model.MULTITON_MSG);
        this.multitonKey = key;
        Model.instanceMap[key] = this;
        this.proxyMap = {};
        this.initializeModel();
    }
    initializeModel() {
    }
    registerProxy(proxy) {
        proxy.initializeNotifier(this.multitonKey);
        this.proxyMap[proxy.name] = proxy;
        proxy.onRegister();
    }
    retrieveProxy(proxyName) {
        return this.proxyMap[proxyName] || null;
    }
    hasProxy(proxyName) {
        return this.proxyMap[proxyName] != null;
    }
    removeProxy(proxyName) {
        let proxy = this.proxyMap[proxyName];
        if (!proxy)
            return null;
        delete this.proxyMap[proxyName];
        proxy.onRemove();
        return proxy;
    }
    static getInstance(key, factory) {
        if (Model.instanceMap[key] == null)
            Model.instanceMap[key] = factory(key);
        return Model.instanceMap[key];
    }
    static removeModel(key) {
        delete Model.instanceMap[key];
    }
    multitonKey;
    proxyMap;
    static instanceMap = {};
    static MULTITON_MSG = "Model instance for this Multiton key already constructed!";
}
exports.Model = Model;
//# sourceMappingURL=Model.js.map