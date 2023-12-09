import {SimpleCommand} from "../../src/patterns/command/SimpleCommand";
import {INotification} from "../../src/interfaces/INotification";
import {ControllerTestVO} from "./ControllerTestVO";

export class ControllerTestCommand extends SimpleCommand {

    public override execute(notification: INotification) {
        let vo = notification.body as ControllerTestVO;
        vo.result = 2 * vo.input;
    }

}
