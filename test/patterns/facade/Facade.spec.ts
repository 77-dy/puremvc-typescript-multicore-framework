import {puremvc} from "../../../src";
import {FacadeTestCommand} from "./FacadeTestCommand";
import {FacadeTestVO} from "./FacadeTestVO";
import {IProxy} from "../../../src/interfaces/IProxy";

describe("FacadeTest", () => {

    test("testGetInstance", () => {
        const facade = puremvc.Facade.getInstance("FacadeTestKey1", (key: string) => new puremvc.Facade(key));
        expect(facade).not.toBeNull();
    });

    test("testRegisterCommandAndSendNotification", () => {
        const facade = puremvc.Facade.getInstance("FacadeTestKey2", (key: string) => new puremvc.Facade(key));
        facade.registerCommand("FacadeTestNote", () => new FacadeTestCommand());

        let vo = new FacadeTestVO(32);
        facade.sendNotification("FacadeTestNote", vo);

        expect(vo.result).toBe(64);
    });

    test("testRegisterAndRemoveCommandAndSendNotification", () => {
        const facade = puremvc.Facade.getInstance("FacadeTestKey3", (key: string) => new puremvc.Facade(key));
        facade.registerCommand("FacadeTestNote", () => new FacadeTestCommand());
        facade.removeCommand("FacadeTestNote");

        let vo = new FacadeTestVO(32);
        facade.sendNotification("FacadeTestNote", vo);

        expect(vo.result).not.toBe(64);
    });

    test("testRegisterAndRemoveCommandAndSendNotification", () => {
        const facade = puremvc.Facade.getInstance("FacadeTestKey4", (key: string) => new puremvc.Facade(key));
        facade.registerCommand("FacadeTestNote", () => new FacadeTestCommand());
        facade.removeCommand("FacadeTestNote");

        let vo = new FacadeTestVO(32);
        facade.sendNotification("FacadeTestNote", vo);

        expect(vo.result).not.toBe(64);
    });

    test("testRegisterAndRetrieveProxy", () => {
        const facade = puremvc.Facade.getInstance("FacadeTestKey5", (key: string) => new puremvc.Facade(key));
        facade.registerProxy(new puremvc.Proxy("colors", ["red", "green", "blue"]));
        let proxy = facade.retrieveProxy("colors");

        expect(proxy).toBeInstanceOf(puremvc.Proxy);

        let data = proxy.data as string[];
        expect(data).not.toBeNull();
        expect(data.length).toBe(3);
        expect(data[0]).toBe("red");
        expect(data[1]).toBe("green");
        expect(data[2]).toBe("blue");
    });

    test("testRegisterAndRemoveProxy", () => {
        const facade = puremvc.Facade.getInstance("FacadeTestKey6", (key: string) => new puremvc.Facade(key));
        let proxy: IProxy = new puremvc.Proxy("sizes", ["7", "13", "21"]);
        facade.registerProxy(proxy);

        let removedProxy: IProxy = facade.removeProxy("sizes");

        expect(proxy.name).toBe("sizes");

        proxy = facade.retrieveProxy("sizes");

        expect(proxy).toBeNull();
    });

    test("testRegisterRetrieveAndRemoveMediator", () => {
        const facade = puremvc.Facade.getInstance("FacadeTestKey7", (key: string) => new puremvc.Facade(key));
        facade.registerMediator(new puremvc.Mediator(puremvc.Mediator.NAME, {}));

        expect(facade.retrieveMediator(puremvc.Mediator.NAME)).not.toBeNull();

        let removedMediator = facade.removeMediator(puremvc.Mediator.NAME);

        expect(removedMediator.name).toBe(puremvc.Mediator.NAME);

        expect(facade.retrieveMediator(puremvc.Mediator.NAME)).toBeNull();
    });

    test("testHasProxy", () => {
        const facade = puremvc.Facade.getInstance("FacadeTestKey8", (key: string) => new puremvc.Facade(key));
        facade.registerProxy(new puremvc.Proxy("hasProxyTest", [1, 2, 3]));

        expect(facade.hasProxy("hasProxyTest")).toBeTruthy();
    });

    test("testHasMediator", () => {
        const facade = puremvc.Facade.getInstance("FacadeTestKey9", (key: string) => new puremvc.Facade(key));
        facade.registerMediator(new puremvc.Mediator("facadeHasMediatorTest", {}));

        expect(facade.hasMediator("facadeHasMediatorTest")).toBeTruthy();

        facade.removeMediator("facadeHasMediatorTest");

        expect(facade.hasMediator("facadeHasMediatorTest")).toBeFalsy();
    });

    test("testHasCommand", () => {
        const facade = puremvc.Facade.getInstance("FacadeTestKey10", (key: string) => new puremvc.Facade(key));
        facade.registerCommand("facadeHasCommandTest", () => new FacadeTestCommand());

        expect(facade.hasCommand("facadeHasCommandTest")).toBeTruthy();

        facade.removeCommand("facadeHasCommandTest");

        expect(facade.hasCommand("facadeHasCommandTest")).toBeFalsy();
    });

    test("testHasCoreAndRemoveCore", () => {

        expect(puremvc.Facade.hasCore("FacadeTestKey11")).toBeFalsy();

        const facade = puremvc.Facade.getInstance("FacadeTestKey11", (key: string) => new puremvc.Facade(key));

        expect(puremvc.Facade.hasCore("FacadeTestKey11")).toBeTruthy();

        puremvc.Facade.removeCore("FacadeTestKey11");

        expect(puremvc.Facade.hasCore("FacadeTestKey11")).toBeFalsy();

    });

});