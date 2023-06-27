import { CommandModule } from "yargs";
import { ParsedSettings, Settings } from "../settings";
import { CommonArgv } from "./_common";
interface ResetArgv extends CommonArgv {
    shadow: boolean;
    erase: boolean;
}
export declare function _reset(parsedSettings: ParsedSettings, shadow: boolean): Promise<void>;
export declare function reset(settings: Settings, shadow?: boolean): Promise<void>;
export declare const resetCommand: CommandModule<never, ResetArgv>;
export {};
