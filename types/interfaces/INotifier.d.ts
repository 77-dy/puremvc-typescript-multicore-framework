export interface INotifier {
    initializeNotifier(key: string): void;
    sendNotification(notificationName: string, body?: any, type?: string): void;
}
