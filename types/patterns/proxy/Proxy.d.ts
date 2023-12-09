import { IProxy } from "../../interfaces/IProxy";
import { Notifier } from "../observer/Notifier";
export declare class Proxy extends Notifier implements IProxy {
    protected readonly _name: string;
    protected _data?: any;
    constructor(name?: string, data?: any);
    onRegister(): void;
    onRemove(): void;
    get name(): string;
    get data(): any;
    set data(data: any);
    static NAME: string;
}
