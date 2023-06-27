import { CommandModule } from "yargs";
import { Settings } from "../settings";
import { CommonArgv } from "./_common";
interface CompileArgv extends CommonArgv {
    shadow?: boolean;
}
export declare function compile(settings: Settings, content: string, shadow?: boolean): Promise<string>;
export declare const compileCommand: CommandModule<{}, CompileArgv>;
export {};
