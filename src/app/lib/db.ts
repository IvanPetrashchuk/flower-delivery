import Database from "better-sqlite3";

const dbUrl = process.env.DATABASE_URL;
if (!dbUrl) {
  throw new Error("DATABASE_URL is not defined in .env file!");
}

const dbPath = dbUrl.replace("file:", "");

const db = new Database(dbPath, { readonly: true });

export default db;
