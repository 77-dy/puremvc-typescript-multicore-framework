import {puremvc} from "../../src";
import {IView} from "../../src/interfaces/IView";
import {IMediator} from "../../src/interfaces/IMediator";
import {INotification} from "../../src/interfaces/INotification";
import {IObserver} from "../../src/interfaces/IObserver";
import {ViewTest} from "./ViewTest";
import {ViewTestNote} from "./ViewTestNote";
import {ViewTestMediator} from "./ViewTestMediator";
import {ViewTestMediator2} from "./ViewTestMediator2";
import {ViewTestMediator3} from "./ViewTestMediator3";
import {ViewTestMediator4} from "./ViewTestMediator4";
import {ViewTestMediator5} from "./ViewTestMediator5";
import {ViewTestMediator6} from "./ViewTestMediator6";

describe("ViewTest", () => {

    test("testGetInstance", () => {
        const view: IView = puremvc.View.getInstance("ViewTestKey1", (key: string) => new puremvc.View(key));
        expect(view).not.toBeNull();
    });

    test("testRegisterAndNotifyObserver", () => {
        const view: IView = puremvc.View.getInstance("ViewTestKey2", (key: string) => new puremvc.View(key));
        let viewTestVar: number = 0;
        let obj = {handleNotification: (notification: INotification) => {
            viewTestVar = notification.body;
        }};
        let observer: IObserver = new puremvc.Observer(obj.handleNotification, obj);
        view.registerObserver(ViewTestNote.NAME, observer);

        let note: INotification = ViewTestNote.create(10);
        view.notifyObservers(note);

        expect(viewTestVar).toBe(10);
    });

    test("testRegisterAndRetrieveMediator", () => {
        const view: IView = puremvc.View.getInstance("ViewTestKey3", (key: string) => new puremvc.View(key));

        let viewTestMediator = new ViewTestMediator(this);
        view.registerMediator(viewTestMediator);

        let mediator: IMediator = view.retrieveMediator(ViewTestMediator.NAME);
        expect(mediator).toBe(viewTestMediator);
    });

    test("testHasMediator", () => {
        const view: IView = puremvc.View.getInstance("ViewTestKey4", (key: string) => new puremvc.View(key));

        let mediator = new puremvc.Mediator("hasMediatorTest", this);
        view.registerMediator(mediator);

        expect(view.hasMediator("hasMediatorTest")).toBeTruthy();

        view.removeMediator("hasMediatorTest");

        expect(view.hasMediator("hasMediatorTest")).toBeFalsy();
    });

    test("testRegisterAndRemoveMediator", () => {
        const view = puremvc.View.getInstance("ViewTestKey5", (key: string) => new puremvc.View(key));

        let mediator: IMediator = new puremvc.Mediator("testing", this);
        view.registerMediator(mediator);

        let removedMediator = view.removeMediator("testing");

        expect(removedMediator.name).toBe("testing");

        expect(view.retrieveMediator("testing")).toBeFalsy();
    });

    test("testOnRegisterAndOnRemove", () => {
        const view = puremvc.View.getInstance("ViewTestKey6", (key: string) => new puremvc.View(key));
        let obj = {onRegisterCalled: false, onRemoveCalled: false};
        let mediator = new ViewTestMediator4(obj);
        view.registerMediator(mediator);

        expect(obj.onRegisterCalled).toBeTruthy();

        view.removeMediator(ViewTestMediator4.NAME);

        expect(obj.onRemoveCalled).toBeTruthy();
    });

    test("testSuccessiveRegisterAndRemoveMediator", () => {
        const view = puremvc.View.getInstance("ViewTestKey7", (key: string) => new puremvc.View(key));

        view.registerMediator(new ViewTestMediator(this));

        expect(view.retrieveMediator(ViewTestMediator.NAME)).toBeInstanceOf(ViewTestMediator);

        view.removeMediator(ViewTestMediator.NAME);

        expect(view.retrieveMediator(ViewTestMediator.NAME)).toBeNull();

        expect(view.retrieveMediator(ViewTestMediator.NAME)).toBeNull();

        view.registerMediator(new ViewTestMediator(this));

        expect(view.retrieveMediator(ViewTestMediator.NAME)).toBeInstanceOf(ViewTestMediator);

        view.removeMediator(ViewTestMediator.NAME);

        expect(view.retrieveMediator(ViewTestMediator.NAME)).toBeNull();
    });

    test("testRemoveMediatorAndSubsequentNotify", () => {
        const view = puremvc.View.getInstance("ViewTestKey8", (key: string) => new puremvc.View(key));

        let obj = {lastNotification: ""};
        view.registerMediator(new ViewTestMediator2(obj));

        view.notifyObservers(new puremvc.Notification(ViewTest.NOTE1));
        expect(obj.lastNotification).toBe(ViewTest.NOTE1);

        view.notifyObservers(new puremvc.Notification(ViewTest.NOTE2));
        expect(obj.lastNotification).toBe(ViewTest.NOTE2);

        view.removeMediator(ViewTestMediator2.NAME);
        expect(view.retrieveMediator(ViewTestMediator2.NAME)).toBeNull();

        obj.lastNotification = null;

        view.notifyObservers(new puremvc.Notification(ViewTest.NOTE1));
        expect(obj.lastNotification).not.toBe(ViewTest.NOTE1);

        view.notifyObservers(new puremvc.Notification(ViewTest.NOTE2));
        expect(obj.lastNotification).not.toBe(ViewTest.NOTE2);
    });

    test("testRemoveOneOfTwoMediatorsAndSubsequentNotify", () => {
        const view = puremvc.View.getInstance("ViewTestKey9", (key: string) => new puremvc.View(key));

        let obj = {lastNotification: ""};
        view.registerMediator(new ViewTestMediator2(obj));

        view.registerMediator(new ViewTestMediator3(obj));

        view.notifyObservers(new puremvc.Notification(ViewTest.NOTE1));
        expect(obj.lastNotification).toBe(ViewTest.NOTE1);

        view.notifyObservers(new puremvc.Notification(ViewTest.NOTE2));
        expect(obj.lastNotification).toBe(ViewTest.NOTE2);

        view.notifyObservers(new puremvc.Notification(ViewTest.NOTE3));
        expect(obj.lastNotification).toBe(ViewTest.NOTE3);

        view.removeMediator(ViewTestMediator2.NAME);
        expect(view.retrieveMediator(ViewTestMediator2.NAME)).toBeNull();

        obj.lastNotification = null;

        view.notifyObservers(new puremvc.Notification(ViewTest.NOTE1));
        expect(obj.lastNotification).not.toBe(ViewTest.NOTE1);

        view.notifyObservers(new puremvc.Notification(ViewTest.NOTE2));
        expect(obj.lastNotification).not.toBe(ViewTest.NOTE2);

        view.notifyObservers(new puremvc.Notification(ViewTest.NOTE3));
        expect(obj.lastNotification).toBe(ViewTest.NOTE3);
    });

    test("testMediatorReregistration", () => {
        const view = puremvc.View.getInstance("ViewTestKey10", (key: string) => new puremvc.View(key));
        let obj = {counter: 0};
        view.registerMediator(new ViewTestMediator5(obj));

        view.registerMediator(new ViewTestMediator5(obj));

        view.notifyObservers(new puremvc.Notification(ViewTest.NOTE5));
        expect(obj.counter).toBe(1);

        view.removeMediator(ViewTestMediator5.NAME);

        expect(view.retrieveMediator(ViewTestMediator5.NAME)).toBeNull();

        obj.counter = 0;
        view.notifyObservers(new puremvc.Notification(ViewTest.NOTE5));
        expect(obj.counter).toBe(0);
    });

    test("testModifyObserverListDuringNotification", () => {
        const view = puremvc.View.getInstance("ViewTestKey11", (key: string) => new puremvc.View(key));
        let obj = {counter: 0};
        view.registerMediator(new ViewTestMediator6(ViewTestMediator6.NAME + "/1", obj));
        view.registerMediator(new ViewTestMediator6(ViewTestMediator6.NAME + "/2", obj));
        view.registerMediator(new ViewTestMediator6(ViewTestMediator6.NAME + "/3", obj));
        view.registerMediator(new ViewTestMediator6(ViewTestMediator6.NAME + "/4", obj));
        view.registerMediator(new ViewTestMediator6(ViewTestMediator6.NAME + "/5", obj));
        view.registerMediator(new ViewTestMediator6(ViewTestMediator6.NAME + "/6", obj));
        view.registerMediator(new ViewTestMediator6(ViewTestMediator6.NAME + "/7", obj));
        view.registerMediator(new ViewTestMediator6(ViewTestMediator6.NAME + "/8", obj));

        view.notifyObservers(new puremvc.Notification(ViewTest.NOTE6));
        expect(obj.counter).toBe(8);

        obj.counter = 0;
        view.notifyObservers(new puremvc.Notification(ViewTest.NOTE6));
        expect(obj.counter).toBe(0);
    });

});
