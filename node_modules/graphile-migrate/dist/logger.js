"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const logger_1 = require("@graphile/logger");
exports.defaultLogger = new logger_1.Logger(logger_1.makeConsoleLogFactory({
    format: `%s`,
    formatParameters(_level, message) {
        return [message];
    },
}));
//# sourceMappingURL=logger.js.map