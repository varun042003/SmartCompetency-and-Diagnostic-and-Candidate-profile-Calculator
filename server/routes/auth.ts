import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { createUser, getUserByEmail } from "../db";

const router = express.Router();

const JWT_SECRET = process.env.JWT_SECRET || "dev-secret";

router.post("/register", async (req, res) => {
  try {
    const { fullName, email, password, institution, qualification, percentage, graduationYear, skills } = req.body;
    if (!email || !password || !fullName) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const existing = getUserByEmail(email);
    if (existing) return res.status(409).json({ message: "User already exists" });

    const hashed = bcrypt.hashSync(password, 8);
    const user = createUser({ fullName, email, password: hashed, institution, qualification, percentage, graduationYear, skills });
    const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, { expiresIn: "7d" });

    // omit password
    const { password: _p, ...userSafe } = user as any;
    res.json({ user: userSafe, token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ message: "Missing credentials" });
    const user = getUserByEmail(email);
    if (!user) return res.status(401).json({ message: "Invalid credentials" });
    const ok = bcrypt.compareSync(password, user.password);
    if (!ok) return res.status(401).json({ message: "Invalid credentials" });
    const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, { expiresIn: "7d" });
    const { password: _p, ...userSafe } = user as any;
    res.json({ user: userSafe, token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
