import {puremvc} from "../../src";
import {INotification} from "../../src/interfaces/INotification";

export class ViewTestNote extends puremvc.Notification {

    public static NAME: string = "ViewTestNote";

    public constructor(name: string, body: any) {
        super(name, body);
    }

    public static create(body: any): INotification {
        return new ViewTestNote(ViewTestNote.NAME, body);
    }

}