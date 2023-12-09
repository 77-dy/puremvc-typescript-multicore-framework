import {puremvc} from "../../../src";
import {IMediator} from "../../../src/interfaces/IMediator";

describe("MediatorTest", () => {

    test("testNameAccessor", () => {
        const mediator: IMediator = new puremvc.Mediator();
        expect(mediator.name).toBe(puremvc.Mediator.NAME);
    });

    test("testViewAccessor", () => {
        let view: Object = {};
        const mediator: IMediator = new puremvc.Mediator(puremvc.Mediator.NAME, view);
        expect(mediator.viewComponent).toBe(view);
    });

});