import {ICommand} from "./ICommand";
import {INotification} from "./INotification";

export interface IController {
    registerCommand(notificationName: string, factory: () => ICommand): void;

    executeCommand(notification: INotification): void;

    hasCommand(notificationName: string): boolean;

    removeCommand(notificationName: string): void;
}