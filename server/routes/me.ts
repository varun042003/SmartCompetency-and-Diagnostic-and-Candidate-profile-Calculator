import express from "express";
import jwt from "jsonwebtoken";
import { getUserById } from "../db";

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET || "dev-secret";

router.get("/me", (req, res) => {
  try {
    const auth = req.headers.authorization;
    if (!auth) return res.status(401).json({ message: "Unauthorized" });
    const token = auth.split(" ")[1];
    if (!token) return res.status(401).json({ message: "Unauthorized" });
    const decoded: any = jwt.verify(token, JWT_SECRET);
    const user = getUserById(Number(decoded.id));
    if (!user) return res.status(404).json({ message: "User not found" });
    const { password: _p, ...userSafe } = user as any;
    res.json({ user: userSafe });
  } catch (err) {
    console.error(err);
    res.status(401).json({ message: "Invalid token" });
  }
});

export default router;
