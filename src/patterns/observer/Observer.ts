import {IObserver} from "../../interfaces/IObserver";
import {INotification} from "../../interfaces/INotification";

export class Observer implements IObserver {

    private _notifyMethod?: (notification: INotification) => void;
    private _notifyContext?: any;

    constructor(notifyMethod?: (notification: INotification) => void, notifyContext?: any) {
        this._notifyMethod = notifyMethod;
        this._notifyContext = notifyContext;
    }

    public set notifyMethod(notifyMethod: (notification: INotification) => void) {
        this._notifyMethod = notifyMethod;
    }

    public get notifyMethod(): (notification: INotification) => void {
        return this._notifyMethod;
    }

    public set notifyContext(notifyContext: any) {
        this._notifyContext = notifyContext;
    }

    public get notifyContext(): any {
        return this._notifyContext;
    }

    public notifyObserver(notification: INotification): void {
        this.notifyMethod.call(this.notifyContext, notification);
    }

    public compareNotifyContext(object: any): boolean {
        return object == this.notifyContext;
    }

}