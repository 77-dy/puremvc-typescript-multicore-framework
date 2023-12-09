import {puremvc} from "../../src";
import {INotification} from "../../src/interfaces/INotification";
import {ViewTest} from "./ViewTest";

export class ViewTestMediator5 extends puremvc.Mediator {

    public static NAME: string = "ViewTestMediator5";

    public constructor(view: any) {
        super(ViewTestMediator5.NAME, view);
    }

    public override listNotificationInterests(): string[] {
        return [ViewTest.NOTE5];
    }

    public override handleNotification(notification: INotification): void {
        this.viewComponent.counter++;
    }

}