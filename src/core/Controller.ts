import {IController} from "../interfaces/IController";
import {IView} from "../interfaces/IView";
import {View} from "./View";
import {ICommand} from "../interfaces/ICommand";
import {INotification} from "../interfaces/INotification";
import {Observer} from "../patterns/observer/Observer";

export class Controller implements IController {

    public constructor(key: string) {
        if (Controller.instanceMap[key] != null) {throw Error(Controller.MULTITON_MSG);}
        this.multitonKey = key;
        Controller.instanceMap[key] = this;
        this.commandMap = {};
        this.initializeController();
    }

    protected initializeController(): void {
        this.view = View.getInstance(this.multitonKey, (key: string) => new View(key));
    }

    public registerCommand(notificationName: string, factory: () => ICommand): void {
        if (this.commandMap[notificationName] == null) {
            this.view?.registerObserver(notificationName, new Observer(this.executeCommand, this));
        }
        this.commandMap[notificationName] = factory;
    }

    public executeCommand(notification: INotification): void {
        let factory: () => ICommand = this.commandMap[notification.name];
        if (factory == null) return;

        let command: ICommand = factory();
        command.initializeNotifier(this.multitonKey);
        command.execute(notification);
    }

    public hasCommand(notificationName: string): boolean {
        return this.commandMap[notificationName] != null;
    }

    public removeCommand(notificationName: string): void {
        if (this.hasCommand(notificationName)) {
            this.view?.removeObserver(notificationName, this);
            delete this.commandMap[notificationName];
        }
    }

    public static getInstance(key: string, factory: (key: string) => IController): IController {
        if (Controller.instanceMap[key] == null)
            Controller.instanceMap[key] = factory(key);
        return Controller.instanceMap[key];
    }

    public static removeController(key: string): void {
        delete Controller.instanceMap[key];
    }

    protected view?: IView;

    protected multitonKey: string;

    protected commandMap: { [key: string]: () => ICommand };

    protected static instanceMap: { [key: string]: IController } = {};

    protected static MULTITON_MSG: string = "Controller instance for this Multiton key already constructed!";
}
