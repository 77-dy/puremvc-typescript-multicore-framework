import { INotifier } from "../../interfaces/INotifier";
import { IFacade } from "../../interfaces/IFacade";
export declare class Notifier implements INotifier {
    initializeNotifier(key: string): void;
    sendNotification(notificationName: string, body?: any, type?: string): void;
    get facade(): IFacade;
    protected multitonKey: string;
    protected static MULTITON_MSG: string;
}
