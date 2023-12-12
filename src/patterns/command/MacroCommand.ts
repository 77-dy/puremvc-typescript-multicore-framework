import {ICommand} from '../../interfaces/ICommand';
import {INotification} from '../../interfaces/INotification';
import {Notifier} from '../observer/Notifier';

export class MacroCommand extends Notifier implements ICommand {

    private subCommands: (() => ICommand)[];

    public constructor() {
        super();
        this.subCommands = [];
        this.initializeMacroCommand();
    }

    public initializeMacroCommand(): void {

    }

    protected addSubCommand(factory: () => ICommand): void {
        this.subCommands.push(factory);
    }

    public execute(notification: INotification): void {
        while (this.subCommands.length > 0) {
            let factory: (() => ICommand) | undefined = this.subCommands.shift();
            let command: ICommand | undefined = factory?.();
            if (command) {
              command.initializeNotifier(this.multitonKey);
              command.execute(notification);
            }
        }
    }

}
