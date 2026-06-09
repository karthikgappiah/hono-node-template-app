import type { z } from "zod";

import type { ItemSchema } from "#src/routes/items.js";

type Item = z.infer<typeof ItemSchema>;

const items: Item[] = [];
let nextId = 1;

export const items_service = {
  create: (data: Omit<Item, "id">): Item => {
    const item: Item = { id: String(nextId), ...data };
    nextId += 1;
    items.push(item);
    return item;
  },

  delete: (id: string): boolean => {
    const idx = items.findIndex((item) => item.id === id);
    if (idx === -1) {
      return false;
    }
    items.splice(idx, 1);
    return true;
  },

  findAll: (): Item[] => items,

  findById: (id: string): Item | undefined =>
    items.find((item) => item.id === id),

  replace: (id: string, data: Omit<Item, "id">): Item | undefined => {
    const idx = items.findIndex((item) => item.id === id);
    if (idx === -1) {
      return undefined;
    }
    const item: Item = { id, ...data };
    items[idx] = item;
    return item;
  },

  update: (id: string, data: Partial<Omit<Item, "id">>): Item | undefined => {
    const idx = items.findIndex((item) => item.id === id);
    if (idx === -1) {
      return undefined;
    }
    items[idx] = { ...items[idx], ...data } as Item;
    return items[idx];
  },
};
