import * as fs from "fs";
import { makeSchema } from "postgraphile";
import { preset } from "./graphile.config";
import { printSchema } from "graphql";
async function main() {
  const { schema } = await makeSchema(preset);
  const exportFileLocation = `${__dirname}/schema.graphql`;
  await fs.writeFileSync(exportFileLocation, printSchema(schema));
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
