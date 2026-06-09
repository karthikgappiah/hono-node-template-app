import { int, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const items_table = sqliteTable("items_table", {
  description: text().notNull(),
  id: int().primaryKey({ autoIncrement: true }),
  name: text().notNull(),
});
