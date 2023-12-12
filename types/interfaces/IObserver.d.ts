import { INotification } from './INotification';
export interface IObserver {
    notifyMethod?: (notification: INotification) => void;
    notifyContext?: any;
    notifyObserver(notification: INotification): void;
    compareNotifyContext(object: any): boolean;
}
