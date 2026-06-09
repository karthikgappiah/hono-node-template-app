import { OpenAPIHono as Hono } from "@hono/zod-openapi";

const app = new Hono({
  // disable strict to differentiate between the routes /home and /home/
  strict: true,
});

app.get("/", (c) => c.text("Hello, world!"));

export default app;
