import { defineConfig } from "drizzle-kit";

export default defineConfig({
  dbCredentials: {
    authToken: process.env.TURSO_AUTH_TOKEN as string,
    url: process.env.TURSO_DATABASE_URL as string,
  },
  dialect: "turso",
  introspect: {
    casing: "preserve",
  },
  out: "./src/database/migrations",
  schema: "./src/database/schemas/*.ts",
  strict: true,
  verbose: true,
});
