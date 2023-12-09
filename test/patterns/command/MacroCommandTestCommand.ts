import {puremvc} from "../../../src";
import {MacroCommandTestSub1Command} from "./MacroCommandTestSub1Command";
import {MacroCommandTestSub2Command} from "./MacroCommandTestSub2Command";

export class MacroCommandTestCommand extends puremvc.MacroCommand {

    public override initializeMacroCommand() {
        this.addSubCommand(() => new MacroCommandTestSub1Command());
        this.addSubCommand(() => new MacroCommandTestSub2Command());
    }

}