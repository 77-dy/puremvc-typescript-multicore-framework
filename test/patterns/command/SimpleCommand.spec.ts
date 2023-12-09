import {puremvc} from "../../../src";
import {SimpleCommandTestVO} from "./SimpleCommandTestVO";
import {SimpleCommandTestCommand} from "./SimpleCommandTestCommand";

describe("SimpleCommandTest", () => {

    test("testSimpleCommandExecute", () => {
        let vo = new SimpleCommandTestVO(5)

        let notification = new puremvc.Notification("SimpleCommandTestNote", vo);

        let command = new SimpleCommandTestCommand();

        command.execute(notification);

        expect(vo.result).toBe(10);

    });

});