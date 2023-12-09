import {puremvc} from "../../src";
import {IModel} from "../../src/interfaces/IModel";
import {IProxy} from "../../src/interfaces/IProxy";
import {ModelTestProxy} from "./ModelTestProxy";

describe("ModelTest", () => {

    test("testGetInstance", () => {
        const model: IModel = puremvc.Model.getInstance("ModelTestKey1", (key: string) => new puremvc.Model(key));
        expect(model).toBeDefined();
        puremvc.Model.removeModel("ModelTestKey1");
    });

    test("testRegisterAndRetrieveProxy", () => {
        const model: IModel = puremvc.Model.getInstance("ModelTestKey2", (key: string) => new puremvc.Model(key));
        model.registerProxy(new puremvc.Proxy("colors", ["red", "green", "blue"]));
        let proxy: IProxy | null = model.retrieveProxy("colors");
        expect(proxy).toBeDefined();
        let data = proxy.data as string[];

        expect(data).not.toBeNull();
        expect(data).toBeInstanceOf(Array);
        expect(data.length).toBe(3);
        expect(data[0]).toBe("red");
        expect(data[1]).toBe("green");
        expect(data[2]).toBe("blue");
    });

    test("testRegisterAndRemoveProxy", () => {
        const model: IModel = puremvc.Model.getInstance("ModelTestKey3", (key: string) => new puremvc.Model(key));
        let proxy: IProxy = new puremvc.Proxy("sizes", ["7", "13", "21"]);
        model.registerProxy(proxy);

        let removedProxy: IProxy | null = model.removeProxy("sizes");
        expect(removedProxy).not.toBeNull();
        expect(removedProxy.name).toBe("sizes");

        proxy = model.retrieveProxy("sizes");
        expect(proxy).toBeNull();
    });

    test("testHasProxy", () => {
        const model: IModel = puremvc.Model.getInstance("ModelTestKey4", (key: string) => new puremvc.Model(key));
        let proxy: IProxy = new puremvc.Proxy("aces", ["clubs", "spades", "hearts", "diamonds"]);
        model.registerProxy(proxy);

        expect(model.hasProxy("aces")).toBeTruthy();
        model.removeProxy("aces");
        expect(model.hasProxy("aces")).toBeFalsy();
    });

    test("testOnRegisterAndOnRemove", () => {
        const model: IModel = puremvc.Model.getInstance("ModelTestKey5", (key: string) => new puremvc.Model(key));
        let proxy: IProxy = new ModelTestProxy();
        model.registerProxy(proxy);

        expect(proxy.data).toBe(ModelTestProxy.ON_REGISTER_CALLED);

        model.removeProxy(ModelTestProxy.NAME);

        expect(proxy.data).toBe(ModelTestProxy.ON_REMOVE_CALLED);
    });

});