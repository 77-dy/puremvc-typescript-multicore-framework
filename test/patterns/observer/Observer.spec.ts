import {puremvc} from "../../../src";
import {INotification} from "../../../src/interfaces/INotification";
import {IObserver} from "../../../src/interfaces/IObserver";

describe("ObserverTest", () => {

    let observerTestVar: number = -1;

    test("testObserverAccessors", () => {
        const observer: IObserver = new puremvc.Observer(null, null);
        observer.notifyContext = this;
        observer.notifyMethod = observerTestMethod;

        let notification: INotification = new puremvc.Notification("ObserverTestNote", 10);
        observer.notifyObserver(notification);

        expect(observerTestVar).toBe(10);
    });

    test("testObserverConstructor", () => {
        const observer: IObserver = new puremvc.Observer(observerTestMethod, this);
        let notification: INotification = new puremvc.Notification("ObserverTestNote", 5);
        observer.notifyObserver(notification);

        expect(observerTestVar).toBe(5);
    });

    test("testCompareNotifyContext", () => {
        const observer: IObserver = new puremvc.Observer(observerTestMethod, this);
        let negTestObject: Object = new Object();

        expect(observer.compareNotifyContext(negTestObject)).toBe(false);
        expect(observer.compareNotifyContext(this)).toBe(true);
    });

    const observerTestMethod = (notification: INotification): void => {
        observerTestVar = notification.body;
    };

});



