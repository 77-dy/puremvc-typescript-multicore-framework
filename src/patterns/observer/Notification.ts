import {INotification} from "../../interfaces/INotification";

export class Notification implements INotification {

    private readonly _name: string;

    private _body?: any;

    private _type?: string;

    public constructor(name: string, body?: any, type?: string) {
        this._name = name;
        this._body = body;
        this._type = type;
    }

    public get name(): string {
        return this._name;
    }

    public get body(): any {
        return this._body;
    }

    public set body(body: any) {
        this._body = body;
    }

    public get type(): string {
        return this._type;
    }

    public set type(type: string) {
        this._type = type;
    }

    public toString(): string {
        let msg: string = `Notification Name: ${this.name}`;
        msg += `\nBody: ${this.body ? this.body : "null"}`;
        msg += `\nType: ${this.type ?? "null"}`;
        return msg;
    }

}

