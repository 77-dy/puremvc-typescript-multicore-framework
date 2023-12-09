import { IMediator } from "../../interfaces/IMediator";
import { INotification } from "../../interfaces/INotification";
import { Notifier } from "../observer/Notifier";
export declare class Mediator extends Notifier implements IMediator {
    protected readonly _name: string;
    protected _viewComponent?: any;
    constructor(name?: string, viewComponent?: any);
    onRegister(): void;
    onRemove(): void;
    listNotificationInterests(): string[];
    handleNotification(notification: INotification): void;
    get name(): string;
    get viewComponent(): any;
    set viewComponent(viewComponent: any);
    static NAME: string;
}
