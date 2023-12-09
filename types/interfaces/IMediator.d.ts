import { INotifier } from "./INotifier";
import { INotification } from "./INotification";
export interface IMediator extends INotifier {
    name: string;
    viewComponent: any;
    onRegister(): void;
    onRemove(): void;
    listNotificationInterests(): string[];
    handleNotification(notification: INotification): void;
}
