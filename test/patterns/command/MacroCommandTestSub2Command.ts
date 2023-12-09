import {puremvc} from "../../../src";
import {INotification} from "../../../src/interfaces/INotification";
import {MacroCommandTestVO} from "./MacroCommandTestVO";

export class MacroCommandTestSub2Command extends puremvc.SimpleCommand {

    public override execute(notification: INotification) {
        let vo: MacroCommandTestVO = notification.body as MacroCommandTestVO;

        // Fabricate a result
        vo.result2 = vo.input * vo.input;
    }

}