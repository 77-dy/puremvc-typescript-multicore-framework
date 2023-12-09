import {puremvc} from "../../../src";
import {FacadeTestVO} from "../facade/FacadeTestVO"
import {FacadeTestCommand} from "../facade/FacadeTestCommand"

/**
 * Test the PureMVC Notifier class.
 *
 * @see Facade
 */
describe("NotifierTest", () => {

    test("test", () => {
        const facade = puremvc.Facade.getInstance("notifierTest", (key: string) => new puremvc.Facade(key));

        expect(puremvc.Facade.hasCore("notifierTest")).toBeTruthy();

        let vo = new FacadeTestVO(5);
        facade.registerCommand("testCommand", () => new FacadeTestCommand());

        let notifier = new puremvc.Notifier();
        notifier.initializeNotifier("notifierTest");
        notifier.sendNotification("testCommand", vo);

        expect(vo.result).toBe(10);
    });

});