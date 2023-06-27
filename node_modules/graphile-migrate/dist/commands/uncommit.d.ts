import { CommandModule } from "yargs";
import { ParsedSettings, Settings } from "../settings";
import { CommonArgv } from "./_common";
export declare function _uncommit(parsedSettings: ParsedSettings): Promise<void>;
export declare function uncommit(settings: Settings): Promise<void>;
export declare const uncommitCommand: CommandModule<never, CommonArgv>;
