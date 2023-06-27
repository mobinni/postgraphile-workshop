import { CommandModule } from "yargs";
import { CommonArgv } from "./_common";
interface InitArgv extends CommonArgv {
    folder?: boolean;
}
export declare function init(options?: InitArgv): Promise<void>;
export declare const initCommand: CommandModule<{}, InitArgv>;
export {};
