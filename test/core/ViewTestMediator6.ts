import {puremvc} from "../../src";
import {ViewTest} from "./ViewTest";
import {INotification} from "../../src/interfaces/INotification";

export class ViewTestMediator6 extends puremvc.Mediator {

    public static NAME: string = "ViewTestMediator6";

    public constructor(name: string, view: any) {
        super(name, view);
    }

    public override listNotificationInterests(): string[] {
        return [ViewTest.NOTE6];
    }

    public handleNotification(notification: INotification) {
        this.facade.removeMediator(this.name);
    }

    public override onRemove() {
        this.viewComponent.counter++;
    }

}