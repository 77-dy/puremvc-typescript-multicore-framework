import {puremvc} from "../../src";

export class ViewTestMediator extends puremvc.Mediator {

    public static NAME = "ViewTestMediator";

    public constructor(view: any) {
        super(ViewTestMediator.NAME, view);
    }

    public override listNotificationInterests(): string[] {
        return ["ABC", "DEF", "GHI"];
    }

}