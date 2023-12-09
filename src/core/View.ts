import {IView} from "../interfaces/IView";
import {IMediator} from "../interfaces/IMediator";
import {IObserver} from "../interfaces/IObserver";
import {Observer} from "../patterns/observer/Observer";
import {INotification} from "../interfaces/INotification";

export class View implements IView {

    constructor(key: string) {
        if (View.instanceMap[key] != null) throw Error(View.MULTITON_MSG);
        this.multitonKey = key;
        View.instanceMap[key] = this;
        this.mediatorMap = {};
        this.observerMap = {};
        this.initializeView();
    }

    private initializeView(): void {
    }

    public registerObserver(notificationName: string, observer: IObserver): void {
        if (this.observerMap[notificationName] != null) {
            this.observerMap[notificationName].push(observer);
        } else {
            this.observerMap[notificationName] = [observer];
        }
    }

    public notifyObservers(notification: INotification): void {
        if (this.observerMap[notification.name] == null) return;

        let observers: IObserver[] = this.observerMap[notification.name].slice();
        for (let i: number = 0; i < observers.length; i++) {
            observers[i].notifyObserver(notification);
        }
    }

    public removeObserver(notificationName: string, notifyContext: any): void {
        let observers: IObserver[] = this.observerMap[notificationName];
        for (let i: number = 0; i < observers.length; i++) {
            if (observers[i].compareNotifyContext(notifyContext) == true) {
                observers.splice(i, 1);
                break;
            }
        }

        if (observers.length == 0) {
            delete this.observerMap[notificationName];
        }
    }

    public registerMediator(mediator: IMediator): void {
        if (this.mediatorMap[mediator.name] != null) return;

        mediator.initializeNotifier(this.multitonKey);

        this.mediatorMap[mediator.name] = mediator;

        let interests: string[] = mediator.listNotificationInterests();

        if (interests.length > 0) {
            let observer: IObserver = new Observer(mediator.handleNotification, mediator);

            for (let i: number = 0; i < interests.length; i++) {
                this.registerObserver(interests[i], observer);
            }
        }

        mediator.onRegister();
    }

    public retrieveMediator(mediatorName: string): IMediator | null {
        return this.mediatorMap[mediatorName] || null;
    }

    public hasMediator(mediatorName: string): boolean {
        return this.mediatorMap[mediatorName] != null;
    }

    public removeMediator(mediatorName: string): IMediator | null {
        let mediator: IMediator = this.mediatorMap[mediatorName];
        if (mediator == null) return null;

        let interests: string[] = mediator.listNotificationInterests();
        for (let i: number = 0; i < interests.length; i++) {
            this.removeObserver(interests[i], mediator);
        }
        delete this.mediatorMap[mediatorName];
        mediator.onRemove();

        return mediator;
    }

    public static getInstance(key: string, factory: (key: string) => IView): IView {
        if (View.instanceMap[key] == null)
            View.instanceMap[key] = factory(key);
        return View.instanceMap[key];
    }

    public static removeView(key: string): void {
        delete View.instanceMap[key];
    }

    protected multitonKey: string;

    protected mediatorMap: { [key: string]: IMediator };

    protected observerMap: { [key: string]: IObserver[] };

    protected static instanceMap: { [key: string]: IView } = {};

    protected static MULTITON_MSG: string = "View instance for this Multiton key already constructed!";

}