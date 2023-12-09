import {puremvc} from "../../src";
import {ViewTest} from "./ViewTest";
import {INotification} from "../../src/interfaces/INotification";

export class ViewTestMediator3 extends puremvc.Mediator {

    public static NAME: string = "ViewTestMediator3";

    public constructor(view: any) {
        super(ViewTestMediator3.NAME, view);
    }

    public listNotificationInterests(): string[] {
        return [ViewTest.NOTE3];
    }

    handleNotification(notification: INotification) {
        this.viewComponent.lastNotification = notification.name;
    }


}