import { OpenAPIHono as Hono } from "@hono/zod-openapi";
import { Scalar } from "@scalar/hono-api-reference";

import manifest from "#/package.json" with { type: "json" };
import { index_route } from "#src/routes/index.js";

const app = new Hono({
  // INFO: strict disabled to not differentiate between /route and /route/
  strict: false,
});

app.openapi(index_route, (c) => c.json({ message: "Hello, world!" }));

app.doc("/spec", {
  info: {
    title: "Template API",
    version: manifest.version,
  },
  openapi: "3.0.0",
});

app.get("/ui", Scalar({ url: "/spec" }));

export default app;
