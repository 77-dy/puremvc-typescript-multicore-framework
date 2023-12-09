import { INotifier } from "./INotifier";
import { INotification } from "./INotification";
export interface ICommand extends INotifier {
    execute(notification: INotification): void;
}
