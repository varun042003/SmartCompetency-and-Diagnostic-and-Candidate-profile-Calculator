import fs from "fs";
import path from "path";
import os from "os";

// Use DATA_DIR env var if provided. In serverless (Vercel) use OS temp dir to ensure writable path.
const useTmpForServerless = !!process.env.VERCEL || process.env.NODE_ENV === "production";
const baseDir = process.env.DATA_DIR
  ? path.resolve(process.env.DATA_DIR)
  : useTmpForServerless
  ? path.join(os.tmpdir(), "competencypro_data")
  : path.resolve(process.cwd(), "data");

if (!fs.existsSync(baseDir)) {
  try {
    fs.mkdirSync(baseDir, { recursive: true });
  } catch (err) {
    console.warn("Could not create data directory:", baseDir, err);
  }
}

const usersFile = path.join(baseDir, "users.json");

function readUsers(): any[] {
  try {
    if (!fs.existsSync(usersFile)) return [];
    const raw = fs.readFileSync(usersFile, "utf-8");
    if (!raw) return [];
    return JSON.parse(raw);
  } catch (err) {
    console.warn("Failed to read/parse users file, returning empty list.", err);
    try {
      // attempt to reset corrupt file
      fs.writeFileSync(usersFile, "[]", "utf-8");
    } catch (e) {
      console.warn("Failed to reset users file", e);
    }
    return [];
  }
}

function writeUsers(users: any[]) {
  try {
    // Atomic write: write to temp file then rename
    const tmp = `${usersFile}.tmp`;
    fs.writeFileSync(tmp, JSON.stringify(users, null, 2), "utf-8");
    fs.renameSync(tmp, usersFile);
  } catch (err) {
    console.error("Failed to write users file:", err);
    throw err;
  }
}

export function createUser(user: {
  fullName: string;
  email: string;
  password: string;
  institution?: string | null;
  qualification?: string | null;
  percentage?: string | null;
  graduationYear?: string | null;
  skills?: string[];
}) {
  const users = readUsers();
  // ensure email uniqueness enforced by caller but double-check here
  if (users.find((u) => u.email === user.email)) {
    throw new Error("User already exists");
  }

  const id = users.length ? Math.max(...users.map((u) => Number(u.id) || 0)) + 1 : 1;
  const newUser = {
    id,
    fullName: user.fullName,
    email: user.email,
    password: user.password,
    institution: user.institution ?? null,
    qualification: user.qualification ?? null,
    percentage: user.percentage ?? null,
    graduationYear: user.graduationYear ?? null,
    skills: Array.isArray(user.skills) ? user.skills : (user.skills ? [user.skills] : []),
    createdAt: new Date().toISOString(),
  };

  users.push(newUser);
  writeUsers(users);
  return getUserById(newUser.id);
}

export function getUserByEmail(email: string) {
  const users = readUsers();
  const row = users.find((u) => u.email === email);
  return row || null;
}

export function getUserById(id: number) {
  const users = readUsers();
  const row = users.find((u) => Number(u.id) === Number(id));
  return row || null;
}

export default {
  createUser,
  getUserByEmail,
  getUserById,
};
