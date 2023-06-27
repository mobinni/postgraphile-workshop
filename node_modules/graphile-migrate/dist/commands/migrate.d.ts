import { CommandModule } from "yargs";
import { ParsedSettings, Settings } from "../settings";
import { CommonArgv } from "./_common";
interface MigrateArgv extends CommonArgv {
    shadow: boolean;
    forceActions: boolean;
}
export declare function _migrate(parsedSettings: ParsedSettings, shadow?: boolean, forceActions?: boolean): Promise<void>;
export declare function migrate(settings: Settings, shadow?: boolean, forceActions?: boolean): Promise<void>;
export declare const migrateCommand: CommandModule<never, MigrateArgv>;
export {};
