"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Notifier = void 0;
const Facade_1 = require("../facade/Facade");
class Notifier {
    initializeNotifier(key) {
        this.multitonKey = key;
    }
    sendNotification(notificationName, body, type) {
        this.facade.sendNotification(notificationName, body, type);
    }
    get facade() {
        if (this.multitonKey == null)
            throw Error(Notifier.MULTITON_MSG);
        return Facade_1.Facade.getInstance(this.multitonKey, (key) => new Facade_1.Facade(key));
    }
    multitonKey;
    static MULTITON_MSG = 'multitonKey for this Notifier not yet initialized!';
}
exports.Notifier = Notifier;
//# sourceMappingURL=Notifier.js.map