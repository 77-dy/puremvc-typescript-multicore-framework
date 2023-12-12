import {IMediator} from '../../interfaces/IMediator';
import {INotification} from '../../interfaces/INotification';
import {Notifier} from '../observer/Notifier';

export class Mediator extends Notifier implements IMediator {

    protected readonly _name: string;
    protected _viewComponent?: any;

    public constructor(name?: string, viewComponent?: any) {
        super();
        this._name = name || Mediator.NAME;
        this._viewComponent = viewComponent;
    }

    public onRegister(): void {

    }

    public onRemove(): void {

    }

    public listNotificationInterests(): string[] {
        return [];
    }

    public handleNotification(notification: INotification): void {

    }

    public get name(): string {
        return this._name;
    }

    public get viewComponent(): any {
        return this._viewComponent;
    }

    public set viewComponent(viewComponent: any) {
        this._viewComponent = viewComponent;
    }

    public static NAME: string = 'Mediator';

}
