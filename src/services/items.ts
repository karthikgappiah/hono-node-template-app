import { eq } from "drizzle-orm";

import { db } from "#src/database/index.js";
import { items_table } from "#src/database/schemas/items.js";

type Item = typeof items_table.$inferSelect;
type NewItem = typeof items_table.$inferInsert;

export const items_service = {
  create: async (data: Omit<NewItem, "id">): Promise<Item> => {
    const rows = await db.insert(items_table).values(data).returning();
    return rows[0];
  },

  delete: async (id: number): Promise<boolean> => {
    const rows = await db
      .delete(items_table)
      .where(eq(items_table.id, id))
      .returning();
    return rows.length > 0;
  },

  findAll: (): Promise<Item[]> => db.select().from(items_table),

  findById: async (id: number): Promise<Item | undefined> => {
    const rows = await db
      .select()
      .from(items_table)
      .where(eq(items_table.id, id))
      .limit(1);
    return rows[0];
  },

  replace: async (
    id: number,
    data: Omit<NewItem, "id">
  ): Promise<Item | undefined> => {
    const rows = await db
      .update(items_table)
      .set(data)
      .where(eq(items_table.id, id))
      .returning();
    return rows[0];
  },

  update: async (
    id: number,
    data: Partial<Omit<NewItem, "id">>
  ): Promise<Item | undefined> => {
    const rows = await db
      .update(items_table)
      .set(data)
      .where(eq(items_table.id, id))
      .returning();
    return rows[0];
  },
};
