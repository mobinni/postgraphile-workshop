"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.defaultLogger = exports.consoleLogFactory = exports.makeConsoleLogFactory = exports.Logger = void 0;
/**
 * A `Logger` is initialized with a `LogFunctionFactory` and an initial scope.
 * It has convenience methods for logging different levels (error, warn, info,
 * debug) which pass through to the underlying `LogFunction`. It also allows a
 * narrower scoped logger to be generated via the `scope` method.
 */
class Logger {
    constructor(logFactory, scope = {}) {
        this._scope = scope;
        this._logFactory = logFactory;
        this.log = logFactory(scope);
    }
    /**
     * Creates a more narrowly scoped logger; this is useful when your code
     * performs a subtask. For example: an HTTP server might have a global
     * logger, and it might create scoped loggers for each incoming HTTP request.
     * When the HTTP requests goes through a particular middleware it might use
     * an even more narrowly scoped logger still.
     */
    scope(additionalScope) {
        return new Logger(this._logFactory, {
            ...this._scope,
            ...additionalScope,
        });
    }
    /**
     * Logs an `LogLevel.ERROR` message.
     */
    error(message, meta) {
        return this.log("error" /* ERROR */, message, meta);
    }
    /**
     * Logs an `LogLevel.WARN` message.
     */
    warn(message, meta) {
        return this.log("warning" /* WARNING */, message, meta);
    }
    /**
     * Logs an `LogLevel.INFO` message.
     */
    info(message, meta) {
        return this.log("info" /* INFO */, message, meta);
    }
    /**
     * Logs an `LogLevel.DEBUG` message.
     */
    debug(message, meta) {
        return this.log("debug" /* DEBUG */, message, meta);
    }
}
exports.Logger = Logger;
/**
 * Lets you build a console log factory with custom log formatter. Only logs
 * `DEBUG` level messages if the `GRAPHILE_LOGGER_DEBUG` environmental variable
 * is set.
 */
function makeConsoleLogFactory({ format, formatParameters } = {
    format: "%s: %s (%O)",
    formatParameters(level, message, scope) {
        return [level.toUpperCase(), message, scope];
    },
}) {
    return function consoleLogFactory(scope) {
        return (level, message) => {
            if (level === "debug" /* DEBUG */ && !process.env.GRAPHILE_LOGGER_DEBUG) {
                return;
            }
            const method = (() => {
                switch (level) {
                    case "error" /* ERROR */:
                        return "error";
                    case "warning" /* WARNING */:
                        return "warn";
                    case "info" /* INFO */:
                        return "info";
                    default:
                        // `console.debug` in Node is just an alias for `console.log` anyway.
                        return "log";
                }
            })();
            console[method](format, ...formatParameters(level, message, scope));
        };
    };
}
exports.makeConsoleLogFactory = makeConsoleLogFactory;
/**
 * Our built in `LogFunctionFactory` which uses `console` for logging, and only
 * logs `DEBUG` level messages if the `GRAPHILE_LOGGER_DEBUG` environmental
 * variable is set. Library authors can use this as a fallback if users don't
 * provide their own logger. If you want to format your logs in a particular
 * way, use `makeConsoleLogFactory` instead.
 */
exports.consoleLogFactory = makeConsoleLogFactory();
/**
 * A logger that can be used immediately.
 */
exports.defaultLogger = new Logger(exports.consoleLogFactory, {});
//# sourceMappingURL=index.js.map