import { INotifier } from './INotifier';
import { ICommand } from './ICommand';
import { IMediator } from './IMediator';
import { INotification } from './INotification';
import { IProxy } from './IProxy';
export interface IFacade extends INotifier {
    registerCommand(notificationName: string, factory: () => ICommand): void;
    hasCommand(notificationName: string): boolean;
    removeCommand(notificationName: string): void;
    registerProxy(proxy: IProxy): void;
    retrieveProxy(proxyName: string): IProxy | null;
    hasProxy(proxyName: string): boolean;
    removeProxy(proxyName: string): IProxy | null;
    registerMediator(mediator: IMediator): void;
    retrieveMediator(mediatorName: string): IMediator | null;
    hasMediator(mediatorName: string): boolean;
    removeMediator(mediatorName: string): IMediator | null;
    notifyObservers(notification: INotification): void;
    sendNotification(notificationName: string, body?: any, type?: string): void;
    initializeNotifier(key: string): void;
}
