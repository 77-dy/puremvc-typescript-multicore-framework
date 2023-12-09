import { ICommand } from "../../interfaces/ICommand";
import { INotification } from "../../interfaces/INotification";
import { Notifier } from "../observer/Notifier";
export declare class MacroCommand extends Notifier implements ICommand {
    private subCommands;
    constructor();
    initializeMacroCommand(): void;
    protected addSubCommand(factory: () => ICommand): void;
    execute(notification: INotification): void;
}
