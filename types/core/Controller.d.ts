import { IController } from "../interfaces/IController";
import { IView } from "../interfaces/IView";
import { ICommand } from "../interfaces/ICommand";
import { INotification } from "../interfaces/INotification";
export declare class Controller implements IController {
    constructor(key: string);
    protected initializeController(): void;
    registerCommand(notificationName: string, factory: () => ICommand): void;
    executeCommand(notification: INotification): void;
    hasCommand(notificationName: string): boolean;
    removeCommand(notificationName: string): void;
    static getInstance(key: string, factory: (key: string) => IController): IController;
    static removeController(key: string): void;
    protected view?: IView;
    protected multitonKey: string;
    protected commandMap: {
        [key: string]: () => ICommand;
    };
    protected static instanceMap: {
        [key: string]: IController;
    };
    protected static MULTITON_MSG: string;
}
