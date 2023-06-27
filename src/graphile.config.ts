// @ts-ignore
import AmberPreset from "postgraphile/presets/amber";
// @ts-ignore
import { makePgService } from "@dataplan/pg/adaptors/pg";

export const preset: GraphileConfig.Preset = {
  extends: [AmberPreset.default ?? AmberPreset],
  disablePlugins: ["NodePlugin"],
  plugins: [],

  inflection: {
    /* options for the inflection system */
  },
  pgServices: [
    /* list of PG database configurations, e.g.: */
    makePgService({
      connectionString: process.env.DATABASE_URL,
      schemas: ["app_public"],
    }),
  ],
  gather: {
    /* options for the gather phase */
  },
  schema: {},
  grafserv: {
    watch: true,
    port: 5678,
    websockets: true,
  },
  grafast: {
    explain: true,
  },
};
