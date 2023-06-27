import { Logger } from "@graphile/logger";
import { ParsedSettings } from "./settings";
interface ActionSpecBase {
    _: string;
    shadow?: boolean;
    /**
     * USE THIS WITH CARE! Currently only supported by the afterReset hook, all
     * other hooks will throw an error when set. Runs the file using the
     * rootConnectionString role (i.e. a superuser, but with database name from
     * connectionString), useful for creating extensions.
     */
    root?: boolean;
}
export declare const DO_NOT_USE_DATABASE_URL = "postgres://PLEASE:USE@GM_DBURL/INSTEAD";
export interface SqlActionSpec extends ActionSpecBase {
    _: "sql";
    file: string;
}
export interface CommandActionSpec extends ActionSpecBase {
    _: "command";
    command: string;
}
export declare type ActionSpec = SqlActionSpec | CommandActionSpec;
export declare function executeActions(parsedSettings: ParsedSettings, shadow: boolean | undefined, actions: ActionSpec[]): Promise<void>;
export declare function makeValidateActionCallback(logger: Logger, allowRoot?: boolean): (inputValue: unknown) => Promise<ActionSpec[]>;
export {};
