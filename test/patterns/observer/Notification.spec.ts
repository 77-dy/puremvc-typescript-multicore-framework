import {puremvc} from "../../../src";
import {INotification} from "../../../src/interfaces/INotification";

describe("NotificationTest", () => {

    test("testNameAccessors", () => {
        const notification: INotification = new puremvc.Notification("TestNote");
        expect(notification.name).toBe("TestNote");
    });

    test("testBodyAccessors", () => {
        const notification: INotification = new puremvc.Notification(null);
        notification.body = 5;
        expect(notification.body).toBe(5);
    });

    test("testConstructor", () => {
        const notification: INotification = new puremvc.Notification("TestNote", 5, "TestNoteType");

        expect(notification.name).toBe("TestNote");
        expect(notification.body).toBe(5);
        expect(notification.type).toBe("TestNoteType");
    });

    test("testToString", () => {
        const notification: INotification = new puremvc.Notification("TestNote", [1, 3, 5], "TestType");
        const ts = "Notification Name: TestNote\nBody: 1,3,5\nType: TestType";

        expect(notification.toString()).toBe(ts);
    });

});