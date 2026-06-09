import { sqliteTable, text } from "drizzle-orm/sqlite-core";

export const items_table = sqliteTable("items_table", {
  description: text().notNull(),
  id: text().primaryKey(),
  name: text().notNull(),
});
