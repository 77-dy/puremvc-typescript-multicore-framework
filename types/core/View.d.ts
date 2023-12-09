import { IView } from "../interfaces/IView";
import { IMediator } from "../interfaces/IMediator";
import { IObserver } from "../interfaces/IObserver";
import { INotification } from "../interfaces/INotification";
export declare class View implements IView {
    constructor(key: string);
    private initializeView;
    registerObserver(notificationName: string, observer: IObserver): void;
    notifyObservers(notification: INotification): void;
    removeObserver(notificationName: string, notifyContext: any): void;
    registerMediator(mediator: IMediator): void;
    retrieveMediator(mediatorName: string): IMediator | null;
    hasMediator(mediatorName: string): boolean;
    removeMediator(mediatorName: string): IMediator | null;
    static getInstance(key: string, factory: (key: string) => IView): IView;
    static removeView(key: string): void;
    protected multitonKey: string;
    protected mediatorMap: {
        [key: string]: IMediator;
    };
    protected observerMap: {
        [key: string]: IObserver[];
    };
    protected static instanceMap: {
        [key: string]: IView;
    };
    protected static MULTITON_MSG: string;
}
