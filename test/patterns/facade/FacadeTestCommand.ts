import {puremvc} from "../../../src";
import {INotification} from "../../../src/interfaces/INotification";
import {FacadeTestVO} from "./FacadeTestVO"

export class FacadeTestCommand extends puremvc.SimpleCommand {

    public override execute(notification: INotification): void  {
        let vo: FacadeTestVO = notification.body as FacadeTestVO
        vo.result = vo.input * 2;
    }

}