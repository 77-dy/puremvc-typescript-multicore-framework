import {INotifier} from "../../interfaces/INotifier";
import {IFacade} from "../../interfaces/IFacade";
import {Facade} from "../facade/Facade";

export class Notifier implements INotifier {

    public initializeNotifier(key: string): void {
        this.multitonKey = key;
    }

    public sendNotification(notificationName: string, body?: any, type?: string): void {
        this.facade.sendNotification(notificationName, body, type);
    }

    public get facade(): IFacade {
        if (this.multitonKey == null) throw Error(Notifier.MULTITON_MSG);
        return Facade.getInstance(this.multitonKey, (key: string) => new Facade(key));
    }

    protected multitonKey: string;

    protected static MULTITON_MSG: string = "multitonKey for this Notifier not yet initialized!";

}