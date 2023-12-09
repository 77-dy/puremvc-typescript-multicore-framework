import {IModel} from "../interfaces/IModel";
import {IProxy} from "../interfaces/IProxy";

export class Model implements IModel {

    public constructor(key: string) {
        if (Model.instanceMap[key] != null) throw Error(Model.MULTITON_MSG);
        this.multitonKey = key;
        Model.instanceMap[key] = this;
        this.proxyMap = {};
        this.initializeModel();
    }

    protected initializeModel(): void {
    }

    public registerProxy(proxy: IProxy): void {
        proxy.initializeNotifier(this.multitonKey);
        this.proxyMap[proxy.name] = proxy;
        proxy.onRegister();
    }

    public retrieveProxy(proxyName: string): IProxy | null {
        return this.proxyMap[proxyName] || null;
    }

    public hasProxy(proxyName: string): boolean {
        return this.proxyMap[proxyName] != null;
    }

    public removeProxy(proxyName: string): IProxy | null {
        let proxy: IProxy = this.proxyMap[proxyName];
        if (!proxy) return null;

        delete this.proxyMap[proxyName];
        proxy.onRemove();
        return proxy;
    }

    public static getInstance(key: string, factory: (key: string) => IModel): IModel {
        if (Model.instanceMap[key] == null)
            Model.instanceMap[key] = factory(key);
        return Model.instanceMap[key];
    }

    public static removeModel(key: string): void {
        delete Model.instanceMap[key];
    }

    protected multitonKey: string;

    protected proxyMap: { [key: string]: IProxy };

    protected static instanceMap: { [key: string]: IModel } = {};

    protected static MULTITON_MSG: string = "Model instance for this Multiton key already constructed!";
}