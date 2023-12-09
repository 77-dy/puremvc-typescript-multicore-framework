import {puremvc} from "../../src";
import {ViewTest} from "./ViewTest";
import {INotification} from "../../src/interfaces/INotification";

export class ViewTestMediator2 extends puremvc.Mediator {

    public static NAME: string = "ViewTestMediator2";

    public constructor(view: any) {
        super(ViewTestMediator2.NAME, view);
    }

    public override listNotificationInterests(): string[] {
        return [ViewTest.NOTE1, ViewTest.NOTE2];
    }

    public override handleNotification(notification: INotification) {
        this.viewComponent.lastNotification = notification.name;
    }

}