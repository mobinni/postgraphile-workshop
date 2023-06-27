import { CommandModule } from "yargs";
import { Settings } from "../settings";
import { CommonArgv } from "./_common";
interface StatusOptions {
    skipDatabase?: boolean;
}
interface StatusArgv extends StatusOptions, CommonArgv {
}
interface Status {
    remainingMigrations?: Array<string>;
    hasCurrentMigration: boolean;
}
export declare function status(settings: Settings, options?: StatusOptions): Promise<Status>;
export declare const statusCommand: CommandModule<never, StatusArgv>;
export {};
