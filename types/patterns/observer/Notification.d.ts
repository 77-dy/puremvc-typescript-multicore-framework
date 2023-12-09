import { INotification } from "../../interfaces/INotification";
export declare class Notification implements INotification {
    private readonly _name;
    private _body?;
    private _type?;
    constructor(name: string, body?: any, type?: string);
    get name(): string;
    get body(): any;
    set body(body: any);
    get type(): string;
    set type(type: string);
    toString(): string;
}
