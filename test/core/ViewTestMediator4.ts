import {puremvc} from "../../src";

export class ViewTestMediator4 extends puremvc.Mediator {

    public static NAME: string = "ViewTestMediator4";

    public constructor(view: any) {
        super(ViewTestMediator4.NAME, view);
    }

    public onRegister() {
        this.viewComponent.onRegisterCalled = true;
    }

    public onRemove() {
        this.viewComponent.onRemoveCalled = true;
    }

}