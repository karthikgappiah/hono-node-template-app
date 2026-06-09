import { beforeAll, describe, expect, it } from "vitest";

import app from "#src/app.js";

describe("items CRUD", () => {
  it("returns 404 for a missing item", async () => {
    const res = await app.request("/api/items/999999");
    expect(res.status).toBe(404);
    await expect(res.json()).resolves.toStrictEqual({
      message: "Item not found",
    });
  });

  it("returns 404 when updating or deleting a missing item", async () => {
    const patchRes = await app.request("/api/items/999999", {
      body: JSON.stringify({ name: "Nope" }),
      headers: { "Content-Type": "application/json" },
      method: "PATCH",
    });
    expect(patchRes.status).toBe(404);

    const deleteRes = await app.request("/api/items/999999", {
      method: "DELETE",
    });
    expect(deleteRes.status).toBe(404);
  });

  describe("full lifecycle", () => {
    let id: number;

    beforeAll(async () => {
      const createRes = await app.request("/api/items", {
        body: JSON.stringify({
          description: "A useful widget",
          name: "Widget",
        }),
        headers: { "Content-Type": "application/json" },
        method: "POST",
      });
      const created = await createRes.json();
      ({ id } = created);
    });

    it("lists and fetches the created item", async () => {
      const listRes = await app.request("/api/items");
      expect(listRes.status).toBe(200);
      const list = await listRes.json();
      expect(list).toContainEqual({
        description: "A useful widget",
        id,
        name: "Widget",
      });

      const getRes = await app.request(`/api/items/${id}`);
      expect(getRes.status).toBe(200);
      await expect(getRes.json()).resolves.toStrictEqual({
        description: "A useful widget",
        id,
        name: "Widget",
      });
    });

    it("replaces the item with PUT", async () => {
      const replaceRes = await app.request(`/api/items/${id}`, {
        body: JSON.stringify({
          description: "An even better widget",
          name: "Widget Pro",
        }),
        headers: { "Content-Type": "application/json" },
        method: "PUT",
      });
      expect(replaceRes.status).toBe(200);
      await expect(replaceRes.json()).resolves.toStrictEqual({
        description: "An even better widget",
        id,
        name: "Widget Pro",
      });
    });

    it("partially updates the item with PATCH", async () => {
      const updateRes = await app.request(`/api/items/${id}`, {
        body: JSON.stringify({ name: "Widget Pro Max" }),
        headers: { "Content-Type": "application/json" },
        method: "PATCH",
      });
      expect(updateRes.status).toBe(200);
      await expect(updateRes.json()).resolves.toStrictEqual({
        description: "An even better widget",
        id,
        name: "Widget Pro Max",
      });
    });

    it("deletes the item", async () => {
      const deleteRes = await app.request(`/api/items/${id}`, {
        method: "DELETE",
      });
      expect(deleteRes.status).toBe(204);

      const afterDeleteRes = await app.request(`/api/items/${id}`);
      expect(afterDeleteRes.status).toBe(404);
    });
  });
});
