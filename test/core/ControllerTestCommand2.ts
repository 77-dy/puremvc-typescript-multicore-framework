import {SimpleCommand} from "../../src/patterns/command/SimpleCommand";
import {INotification} from "../../src/interfaces/INotification";
import {ControllerTestVO} from "./ControllerTestVO";

export class ControllerTestCommand2 extends SimpleCommand {

    public override execute(notification: INotification): void {
        let vo = notification.body as ControllerTestVO;

        // Fabricate a result
        vo.result = vo.result + (2 * vo.input);
    }

}