interface IBar {
    readonly name: string;
}
declare class Bar implements IBar {
    protected readonly _name: string;
    get name(): string;
}
declare let bar: Bar;
declare let factory: () => IBar;
