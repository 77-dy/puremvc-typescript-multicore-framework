import {puremvc} from "../../src";

export class ModelTestProxy extends puremvc.Proxy {

    public static NAME: string = "ModelTestProxy";
    public static ON_REGISTER_CALLED: string = "OnRegisterCalled";
    public static ON_REMOVE_CALLED: string = "OnRemoveCalled";

    public constructor() {
        super(ModelTestProxy.NAME, "");
    }

    public override onRegister(): void {
        this.data = ModelTestProxy.ON_REGISTER_CALLED;
    }

    public override onRemove(): void {
        this.data = ModelTestProxy.ON_REMOVE_CALLED;
    }

}