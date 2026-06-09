import { createRoute, z } from "@hono/zod-openapi";

export const ItemSchema = z
  .object({
    description: z.string().openapi({ example: "A useful widget" }),
    id: z.number().openapi({ example: 1 }),
    name: z.string().openapi({ example: "Widget" }),
  })
  .openapi("Item");

export const ItemBodySchema = ItemSchema.omit({ id: true }).openapi("ItemBody");

export const ItemPatchSchema = ItemBodySchema.partial().openapi("ItemPatch");

export const IdParamSchema = z.object({
  id: z.coerce
    .number()
    .openapi({ example: 1, param: { in: "path", name: "id" } }),
});

export const NotFoundSchema = z
  .object({ message: z.string().openapi({ example: "Item not found" }) })
  .openapi("NotFound");

export const list_items_route = createRoute({
  method: "get",
  path: "/items",
  responses: {
    200: {
      content: {
        "application/json": {
          schema: z.array(ItemSchema).openapi("ItemsResponse"),
        },
      },
      description: "Returns all items",
    },
  },
  tags: ["CRUD"],
});

export const get_item_route = createRoute({
  method: "get",
  path: "/items/{id}",
  request: { params: IdParamSchema },
  responses: {
    200: {
      content: { "application/json": { schema: ItemSchema } },
      description: "Returns a single item",
    },
    404: {
      content: { "application/json": { schema: NotFoundSchema } },
      description: "Item not found",
    },
  },
  tags: ["CRUD"],
});

export const create_item_route = createRoute({
  method: "post",
  path: "/items",
  request: {
    body: {
      content: { "application/json": { schema: ItemBodySchema } },
      required: true,
    },
  },
  responses: {
    201: {
      content: { "application/json": { schema: ItemSchema } },
      description: "Item created",
    },
  },
  tags: ["CRUD"],
});

export const replace_item_route = createRoute({
  method: "put",
  path: "/items/{id}",
  request: {
    body: {
      content: { "application/json": { schema: ItemBodySchema } },
      required: true,
    },
    params: IdParamSchema,
  },
  responses: {
    200: {
      content: { "application/json": { schema: ItemSchema } },
      description: "Item replaced",
    },
    404: {
      content: { "application/json": { schema: NotFoundSchema } },
      description: "Item not found",
    },
  },
  tags: ["CRUD"],
});

export const update_item_route = createRoute({
  method: "patch",
  path: "/items/{id}",
  request: {
    body: {
      content: { "application/json": { schema: ItemPatchSchema } },
      required: true,
    },
    params: IdParamSchema,
  },
  responses: {
    200: {
      content: { "application/json": { schema: ItemSchema } },
      description: "Item updated",
    },
    404: {
      content: { "application/json": { schema: NotFoundSchema } },
      description: "Item not found",
    },
  },
  tags: ["CRUD"],
});

export const delete_item_route = createRoute({
  method: "delete",
  path: "/items/{id}",
  request: { params: IdParamSchema },
  responses: {
    204: { description: "Item deleted" },
    404: {
      content: { "application/json": { schema: NotFoundSchema } },
      description: "Item not found",
    },
  },
  tags: ["CRUD"],
});
