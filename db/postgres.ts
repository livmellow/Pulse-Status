import { Pool } from "pg";

let pool: Pool | undefined;

export function db() {
  const connectionString = process.env.DATABASE_URL;
  if (!connectionString) throw new Error("DATABASE_URL is not configured");
  pool ??= new Pool({ connectionString, ssl: connectionString.includes("railway") ? { rejectUnauthorized: false } : undefined });
  return pool;
}

export async function applySchema() {
  const { readFile } = await import("node:fs/promises");
  const sql = await readFile(new URL("./railway-schema.sql", import.meta.url), "utf8");
  await db().query(sql);
}
