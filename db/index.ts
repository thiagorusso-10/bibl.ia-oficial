import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "./schema";

// Fallback dummy URL prevents Node.js from fatal crashing on boot if env is missing
const connectionString = process.env.DATABASE_URL || "postgres://dummy:dummy@localhost:5432/dummy";

const client = postgres(connectionString, {
    idle_timeout: 20,
    max_lifetime: 60 * 30,
    connect_timeout: 30,
});

export const db = drizzle(client, { schema });
