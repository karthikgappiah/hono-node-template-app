import { createRoute, z } from "@hono/zod-openapi";

const ResponseSchema = z
  .object({
    message: z.string().openapi({ example: "Hello, world!" }),
  })
  .openapi("HelloResponse");

export const index_route = createRoute({
  method: "get",
  path: "/",
  responses: {
    200: {
      content: {
        "application/json": {
          schema: ResponseSchema,
        },
      },
      description: "Returns a greeting message",
    },
  },
});
