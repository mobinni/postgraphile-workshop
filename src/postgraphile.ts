// Create a Grafserv instance
import postgraphile from "postgraphile";
import { preset } from "./graphile.config";

export const pgl = postgraphile(preset);
