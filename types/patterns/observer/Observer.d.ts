import { IObserver } from '../../interfaces/IObserver';
import { INotification } from '../../interfaces/INotification';
export declare class Observer implements IObserver {
    private _notifyMethod?;
    private _notifyContext?;
    constructor(notifyMethod?: (notification: INotification) => void, notifyContext?: any);
    set notifyMethod(notifyMethod: ((notification: INotification) => void) | undefined);
    get notifyMethod(): ((notification: INotification) => void) | undefined;
    set notifyContext(notifyContext: any);
    get notifyContext(): any;
    notifyObserver(notification: INotification): void;
    compareNotifyContext(object: any): boolean;
}
