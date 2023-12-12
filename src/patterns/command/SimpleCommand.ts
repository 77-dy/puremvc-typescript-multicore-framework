import {ICommand} from '../../interfaces/ICommand';
import {INotification} from '../../interfaces/INotification';
import {Notifier} from '../observer/Notifier';

export class SimpleCommand extends Notifier implements ICommand {

    public execute(notification: INotification): void {

    }

}
