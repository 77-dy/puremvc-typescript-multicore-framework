"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MacroCommand = void 0;
const Notifier_1 = require("../observer/Notifier");
class MacroCommand extends Notifier_1.Notifier {
    subCommands;
    constructor() {
        super();
        this.subCommands = [];
        this.initializeMacroCommand();
    }
    initializeMacroCommand() {
    }
    addSubCommand(factory) {
        this.subCommands.push(factory);
    }
    execute(notification) {
        while (this.subCommands.length > 0) {
            let factory = this.subCommands.shift();
            let command = factory();
            command.initializeNotifier(this.multitonKey);
            command.execute(notification);
        }
    }
}
exports.MacroCommand = MacroCommand;
//# sourceMappingURL=MacroCommand.js.map