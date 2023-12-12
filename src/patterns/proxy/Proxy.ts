import {IProxy} from '../../interfaces/IProxy';
import {Notifier} from '../observer/Notifier';

export class Proxy extends Notifier implements IProxy {

    protected readonly _name: string;
    protected _data?: any;

    public constructor(name?: string, data?: any) {
        super();
        this._name = name || Proxy.NAME;
        this._data = data;
    }

    public onRegister(): void {

    }

    public onRemove(): void {

    }

    public get name(): string {
        return this._name;
    }

    public get data(): any {
        return this._data;
    }

    public set data(data: any) {
        this._data = data;
    }

    public static NAME: string = 'Proxy';

}
