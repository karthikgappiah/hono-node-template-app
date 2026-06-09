import { OpenAPIHono } from "@hono/zod-openapi";

import {
  create_item_route,
  delete_item_route,
  get_item_route,
  list_items_route,
  replace_item_route,
  update_item_route,
} from "#src/routes/items.js";
import { items_service } from "#src/services/items.js";

export const items_controller = new OpenAPIHono();

items_controller.openapi(list_items_route, (c) =>
  c.json(items_service.findAll())
);

items_controller.openapi(get_item_route, (c) => {
  const item = items_service.findById(c.req.valid("param").id);
  if (!item) {
    return c.json({ message: "Item not found" }, 404);
  }
  return c.json(item, 200);
});

items_controller.openapi(create_item_route, (c) => {
  const item = items_service.create(c.req.valid("json"));
  return c.json(item, 201);
});

items_controller.openapi(replace_item_route, (c) => {
  const item = items_service.replace(
    c.req.valid("param").id,
    c.req.valid("json")
  );
  if (!item) {
    return c.json({ message: "Item not found" }, 404);
  }
  return c.json(item, 200);
});

items_controller.openapi(update_item_route, (c) => {
  const item = items_service.update(
    c.req.valid("param").id,
    c.req.valid("json")
  );
  if (!item) {
    return c.json({ message: "Item not found" }, 404);
  }
  return c.json(item, 200);
});

items_controller.openapi(delete_item_route, (c) => {
  const deleted = items_service.delete(c.req.valid("param").id);
  if (!deleted) {
    return c.json({ message: "Item not found" }, 404);
  }
  return c.body(null, 204);
});
