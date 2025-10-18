import Database from "better-sqlite3";
import fs from "fs";
import path from "path";

const dataDir = path.resolve(process.cwd(), "data");
if (!fs.existsSync(dataDir)) fs.mkdirSync(dataDir, { recursive: true });
const dbPath = path.join(dataDir, "db.sqlite");
const db = new Database(dbPath);

// Initialize tables
db.pragma("journal_mode = WAL");

db.exec(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    fullName TEXT,
    email TEXT UNIQUE,
    password TEXT,
    institution TEXT,
    qualification TEXT,
    percentage TEXT,
    graduationYear TEXT,
    skills TEXT,
    createdAt TEXT
  );
`);

export function createUser(user: {
  fullName: string;
  email: string;
  password: string;
  institution?: string;
  qualification?: string;
  percentage?: string;
  graduationYear?: string;
  skills?: string[];
}) {
  const stmt = db.prepare(
    `INSERT INTO users (fullName, email, password, institution, qualification, percentage, graduationYear, skills, createdAt)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`
  );
  const info = stmt.run(
    user.fullName,
    user.email,
    user.password,
    user.institution || null,
    user.qualification || null,
    user.percentage || null,
    user.graduationYear || null,
    (user.skills || []).join(','),
    new Date().toISOString()
  );
  return getUserById(Number(info.lastInsertRowid));
}

export function getUserByEmail(email: string) {
  const stmt = db.prepare(`SELECT * FROM users WHERE email = ?`);
  const row = stmt.get(email);
  return row || null;
}

export function getUserById(id: number) {
  const stmt = db.prepare(`SELECT * FROM users WHERE id = ?`);
  const row = stmt.get(id);
  return row || null;
}

export default db;
