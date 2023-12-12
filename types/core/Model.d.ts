import { IModel } from "../interfaces/IModel";
import { IProxy } from '../interfaces/IProxy';
export declare class Model implements IModel {
    constructor(key: string);
    protected initializeModel(): void;
    registerProxy(proxy: IProxy): void;
    retrieveProxy(proxyName: string): IProxy | null;
    hasProxy(proxyName: string): boolean;
    removeProxy(proxyName: string): IProxy | null;
    static getInstance(key: string, factory: (key: string) => IModel): IModel;
    static removeModel(key: string): void;
    protected multitonKey: string;
    protected proxyMap: {
        [key: string]: IProxy;
    };
    protected static instanceMap: {
        [key: string]: IModel;
    };
    protected static MULTITON_MSG: string;
}
