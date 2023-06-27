import Koa from "koa";
// @ts-ignore
import { grafserv } from "grafserv/koa/v2";
import { pgl } from "./postgraphile";

// Create a Koa app
const app = new Koa();
const serv = pgl.createServ(grafserv);
const resolvedPreset = pgl.getResolvedPreset();

const port = resolvedPreset.grafserv?.port ?? 5678;
const host = resolvedPreset.grafserv?.host ?? "127.0.0.1";

const server = app.listen(port, host, () => {
  console.log(`Server running on http://${host}:${port}/`);
});

// @ts-ignore
serv.addTo(app, server);
