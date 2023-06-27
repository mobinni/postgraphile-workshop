import { ParsedSettings, Settings } from "../settings";
import { CommandModule } from "yargs";
import { CommonArgv } from "./_common";
interface WatchArgv extends CommonArgv {
    once: boolean;
    shadow: boolean;
}
export declare function _makeCurrentMigrationRunner(parsedSettings: ParsedSettings, _once?: boolean, shadow?: boolean): () => Promise<void>;
export declare function _watch(parsedSettings: ParsedSettings, once?: boolean, shadow?: boolean): Promise<void>;
export declare function watch(settings: Settings, once?: boolean, shadow?: boolean): Promise<void>;
export declare const watchCommand: CommandModule<never, WatchArgv>;
export {};
