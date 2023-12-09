import {puremvc} from "../../src";
import {ControllerTestCommand} from "./ControllerTestCommand";
import {ControllerTestVO} from "./ControllerTestVO";
import {INotification} from "../../src/interfaces/INotification";
import {ControllerTestCommand2} from "./ControllerTestCommand2";
import {View} from "../../src/core/View";

describe("ControllerTest", () => {

    test("testGetInstance", () => {
        let controller = puremvc.Controller.getInstance("ControllerTestKey1", (key: string) => new puremvc.Controller(key));
        expect(controller).toBeDefined();
    });

    test("testRegisterAndExecuteCommand", () => {
        let controller = puremvc.Controller.getInstance("ControllerTestKey2", (key: string) => new puremvc.Controller(key));
        controller.registerCommand("ControllerTest", () => new ControllerTestCommand());

        let vo = new ControllerTestVO(12);
        let notification: INotification = new puremvc.Notification("ControllerTest", vo);

        controller.executeCommand(notification);
        expect(vo.result).toBe(24);
    });

    test("testRegisterAndRemoveCommand", () => {
        let controller = puremvc.Controller.getInstance("ControllerTestKey3", (key: string) => new puremvc.Controller(key));
        controller.registerCommand("ControllerRemoveTest", () => new ControllerTestCommand());

        let vo = new ControllerTestVO(12);
        let notification = new puremvc.Notification("ControllerRemoveTest", vo);

        controller.executeCommand(notification);

        expect(vo.result).toBe(24);

        vo.result = 0;

        controller.removeCommand("ControllerRemoveTest");

        controller.executeCommand(notification);

        expect(vo.result).toBe(0);
    });

    test("testHasCommand", () => {
        let controller = puremvc.Controller.getInstance("ControllerTestKey4", (key: string) => new puremvc.Controller(key));
        controller.registerCommand("hasCommandTest", () => new ControllerTestCommand());

        expect(controller.hasCommand("hasCommandTest")).toBeTruthy();

        controller.removeCommand("hasCommandTest");

        expect(controller.hasCommand("hasCommandTest")).toBeFalsy();
    });

    test("testReregisterAndExecuteCommand", () => {
        let controller = puremvc.Controller.getInstance("ControllerTestKey5", (key: string) => new puremvc.Controller(key));
        controller.registerCommand("CoontrollerTest2", () => new ControllerTestCommand2());

        controller.removeCommand("ControllerTest2");

        controller.registerCommand("ControllerTest2", () => new ControllerTestCommand2());

        let vo = new ControllerTestVO(12);
        let note = new puremvc.Notification("ControllerTest2", vo);

        let view = puremvc.View.getInstance("ControllerTestKey5", (key: string) => new View((key)));

        view.notifyObservers(note);

        expect(vo.result).toBe(24);

        view.notifyObservers(note);

        expect(vo.result).toBe(48);
    });

});