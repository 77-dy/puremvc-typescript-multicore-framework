import {IFacade} from "../../interfaces/IFacade";
import {IController} from "../../interfaces/IController";
import {Controller} from "../../core/Controller";
import {IModel} from "../../interfaces/IModel";
import {Model} from "../../core/Model";
import {IView} from "../../interfaces/IView";
import {View} from "../../core/View";
import {ICommand} from "../../interfaces/ICommand";
import {IMediator} from "../../interfaces/IMediator";
import {INotification} from "../../interfaces/INotification";
import {Notification} from "../observer/Notification";
import {IProxy} from "../../interfaces/IProxy";

export class Facade implements IFacade {

    public constructor(key: string) {
        if (Facade.instanceMap[key] != null) throw Error(Facade.MULTITON_MSG);
        this.initializeNotifier(key);
        Facade.instanceMap[key] = this;
        this.initializeFacade();
    }

    protected initializeFacade(): void {
        this.initializeModel();
        this.initializeController();
        this.initializeView();
    }

    private initializeModel(): void {
        if (this.model != null) return;
        this.model = Model.getInstance(this.multitonKey, (key: string) => new Model(key));
    }

    private initializeController(): void {
        if (this.controller != null) return;
        this.controller = Controller.getInstance(this.multitonKey, (key: string) => new Controller(key));
    }

    private initializeView(): void {
        if (this.view != null) return;
        this.view = View.getInstance(this.multitonKey, (key: string) => new View(key));
    }

    public registerCommand(notificationName: string, factory: () => ICommand): void {
        this.controller.registerCommand(notificationName, factory);
    }

    public hasCommand(notificationName: string): boolean {
        return this.controller.hasCommand(notificationName);
    }

    public removeCommand(notificationName: string): void {
        this.controller.removeCommand(notificationName);
    }

    public registerProxy(proxy: IProxy): void {
        this.model.registerProxy(proxy);
    }

    public retrieveProxy(proxyName: string): IProxy | null {
        return this.model.retrieveProxy(proxyName);
    }

    public hasProxy(proxyName: string): boolean {
        return this.model.hasProxy(proxyName);
    }

    public removeProxy(proxyName: string): IProxy | null {
        return this.model.removeProxy(proxyName);
    }

    public registerMediator(mediator: IMediator): void {
        this.view.registerMediator(mediator);
    }

    public retrieveMediator(mediatorName: string): IMediator | null {
        return this.view.retrieveMediator(mediatorName);
    }

    public hasMediator(mediatorName: string): boolean {
        return this.view.hasMediator(mediatorName);
    }

    public removeMediator(mediatorName: string): IMediator | null {
        return this.view.removeMediator(mediatorName);
    }

    public notifyObservers(notification: INotification): void {
        this.view.notifyObservers(notification);
    }

    public sendNotification(notificationName: string, body?: any, type?: string): void {
        this.notifyObservers(new Notification(notificationName, body, type));
    }

    public initializeNotifier(key: string): void {
        this.multitonKey = key;
    }

    public static getInstance(key: string, factory: (key: string) => IFacade): IFacade {
        if (Facade.instanceMap[key] == null)
            Facade.instanceMap[key] = factory(key);
        return Facade.instanceMap[key];
    }

    public static hasCore(key: string): boolean {
        return this.instanceMap[key] != null;
    }

    public static removeCore(key: string): void {
        if (this.instanceMap[key] == null) return;
        Model.removeModel(key);
        View.removeView(key);
        Controller.removeController(key);
        delete this.instanceMap[key];
    }

    protected controller?: IController;

    protected model?: IModel;

    protected view?: IView;

    protected multitonKey: string;

    protected static instanceMap: { [key: string]: IFacade } = {};

    protected static MULTITON_MSG: string = "Facade instance for this Multiton key already constructed!";

}