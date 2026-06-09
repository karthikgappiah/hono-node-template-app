import { OpenAPIHono as Hono } from "@hono/zod-openapi";
import { Scalar } from "@scalar/hono-api-reference";

import manifest from "#/package.json" with { type: "json" };
import { items_controller } from "#src/controllers/items.js";
import { index_route } from "#src/routes/index.js";

const app = new Hono({
  // INFO: strict disabled to not differentiate between /route and /route/
  strict: false,
}).basePath("/api");

app.openapi(index_route, (c) => c.json({ message: "Hello, world!" }));

app.route("/", items_controller);

app.doc("/spec", {
  info: {
    title: "Template API",
    version: manifest.version,
  },
  openapi: "3.0.0",
});

app.get("/ui", Scalar({ url: "/api/spec" }));

export default app;
