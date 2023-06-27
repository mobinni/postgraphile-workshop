import { CommandModule } from "yargs";
import { ParsedSettings, Settings } from "../settings";
import { CommonArgv } from "./_common";
interface CommitArgv extends CommonArgv {
    message?: string;
}
export declare function _commit(parsedSettings: ParsedSettings, messageOverride?: string | null | undefined): Promise<void>;
export declare function commit(settings: Settings, message?: string | null): Promise<void>;
export declare const commitCommand: CommandModule<never, CommitArgv>;
export {};
