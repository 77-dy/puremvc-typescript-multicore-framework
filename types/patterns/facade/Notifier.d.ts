import { INotifier } from "../../interfaces/INotifier";
export declare class Notifier implements INotifier {
    initializeNotifier(key: string): void;
    sendNotification(notificationName: string, body?: any, type?: string): void;
    protected multitonKey: string;
    protected static MULTITON_MSG: string;
}
