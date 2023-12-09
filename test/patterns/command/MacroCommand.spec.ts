import {puremvc} from "../../../src";
import {MacroCommandTestVO} from "./MacroCommandTestVO";
import {MacroCommandTestCommand} from "./MacroCommandTestCommand";

describe("MacroCommandTest", () => {

    test("testMacroCommandExecute", () => {
        let vo: MacroCommandTestVO = new MacroCommandTestVO(5);
        let notification = new puremvc.Notification("MacroCommandTest", vo);

        let command: MacroCommandTestCommand = new MacroCommandTestCommand();

        command.execute(notification);

        expect(vo.result1).toBe(10);
        expect(vo.result2).toBe(25);
    });

});