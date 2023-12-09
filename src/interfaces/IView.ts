import {IMediator} from "./IMediator";
import {INotification} from "./INotification";
import {IObserver} from "./IObserver";

export interface IView {
    registerObserver(notificationName: string, observer: IObserver): void;

    notifyObservers(notification: INotification): void;

    removeObserver(notificationName: string, notifyContext: any): void;

    registerMediator(mediator: IMediator): void;

    retrieveMediator(mediatorName: string): IMediator | null;

    hasMediator(mediatorName: string): boolean;

    removeMediator(mediatorName: string): IMediator | null;
}