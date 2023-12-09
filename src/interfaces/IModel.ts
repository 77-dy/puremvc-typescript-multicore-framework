import {IProxy} from "./IProxy";

export interface IModel {
    registerProxy(proxy: IProxy): void;

    retrieveProxy(proxyName: string): IProxy | null;

    hasProxy(proxyName: string): boolean;

    removeProxy(proxyName: string): IProxy | null;
}