export interface INotification {
    readonly name: string;
    body?: any;
    type?: string;
    toString(): string;
}
