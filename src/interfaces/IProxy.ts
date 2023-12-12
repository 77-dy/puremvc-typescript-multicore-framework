import {INotifier} from './INotifier';

export interface IProxy extends INotifier {
    readonly name: string;
    data?: any;

    onRegister(): void;

    onRemove(): void;
}
