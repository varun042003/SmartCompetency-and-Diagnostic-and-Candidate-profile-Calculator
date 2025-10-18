import fs from "fs";
import path from "path";

const dataDir = path.resolve(process.cwd(), "data");
if (!fs.existsSync(dataDir)) fs.mkdirSync(dataDir, { recursive: true });
const usersFile = path.join(dataDir, "users.json");

function readUsers(): any[] {
  try {
    if (!fs.existsSync(usersFile)) return [];
    const raw = fs.readFileSync(usersFile, "utf-8");
    return JSON.parse(raw || "[]");
  } catch (err) {
    console.warn("Failed to read users file, resetting.", err);
    return [];
  }
}

function writeUsers(users: any[]) {
  fs.writeFileSync(usersFile, JSON.stringify(users, null, 2), "utf-8");
}

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
  const users = readUsers();
  const id = users.length ? Math.max(...users.map((u) => u.id || 0)) + 1 : 1;
  const newUser = {
    id,
    fullName: user.fullName,
    email: user.email,
    password: user.password,
    institution: user.institution || null,
    qualification: user.qualification || null,
    percentage: user.percentage || null,
    graduationYear: user.graduationYear || null,
    skills: (user.skills || []).join(","),
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
