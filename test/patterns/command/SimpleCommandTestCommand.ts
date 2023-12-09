import {puremvc} from "../../../src";
import {INotification} from "../../../src/interfaces/INotification";
import {SimpleCommandTestVO} from "./SimpleCommandTestVO";

export class SimpleCommandTestCommand extends puremvc.SimpleCommand {

    execute(notification: INotification): void {
        let vo: SimpleCommandTestVO = notification.body as SimpleCommandTestVO;

        // Fabricate a result
        vo.result = vo.input * 2;
    }

}