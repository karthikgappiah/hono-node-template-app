import { createClient } from "@libsql/client";
import { drizzle } from "drizzle-orm/libsql";

const client = createClient({
  authToken: process.env.TURSO_AUTH_TOKEN as string,
  url: process.env.TURSO_DATABASE_URL as string,
});
export const db = drizzle({ client });
