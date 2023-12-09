import {puremvc} from "../../../src";
import {INotification} from "../../../src/interfaces/INotification";
import {MacroCommandTestVO} from "./MacroCommandTestVO";

export class MacroCommandTestSub1Command extends puremvc.SimpleCommand {

    public override execute(notification: INotification) {
        let vo = notification.body as MacroCommandTestVO;

        // Fabricate a result
        vo.result1 = 2 * vo.input;
    }

}