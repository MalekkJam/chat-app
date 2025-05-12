import { DatabaseSync } from "node:sqlite";

let db: DatabaseSync;

try {
  db = new DatabaseSync("../database/chat_app.db");
  console.log("Connected to SQLite database successfully!");
} catch (err) {
  console.error("Error connecting to SQLite database:", err);
  db = null as any;
}

export default db;
