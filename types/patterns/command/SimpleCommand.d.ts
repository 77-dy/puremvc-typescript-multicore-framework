import { ICommand } from '../../interfaces/ICommand';
import { INotification } from '../../interfaces/INotification';
import { Notifier } from '../observer/Notifier';
export declare class SimpleCommand extends Notifier implements ICommand {
    execute(notification: INotification): void;
}
