import {puremvc} from "../../../src";
import {IProxy} from "../../../src/interfaces/IProxy";

describe("ProxyTest", () => {

    test("testNameAccessor", () => {
        const proxy: IProxy = new puremvc.Proxy("TestProxy");
        expect(proxy.name).toBe("TestProxy");
    });

    test("testDataAccessors", () => {
        const proxy = new puremvc.Proxy("colors");
        proxy.data = ["red", "green", "blue"];
        let data = proxy.data;

        expect(data.length).toBe(3);
        expect(data[0]).toBe("red");
        expect(data[1]).toBe("green");
        expect(data[2]).toBe("blue");
    });

    test("testConstructor", () => {
        const proxy = new puremvc.Proxy("colors", ["red", "green", "blue"]);
        let data = proxy.data;

        expect(data.length).toBe(3);
        expect(data[0]).toBe("red");
        expect(data[1]).toBe("green");
        expect(data[2]).toBe("blue");
    });

});