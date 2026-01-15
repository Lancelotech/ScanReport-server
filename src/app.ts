import express from "express";
import cors from "cors";
import { requireAuth } from "./middleware/requireAuth.js";

export const app = express();

app.use(cors({ origin: true }));
app.use(express.json());

app.get("/health", (_req, res) => res.json({ ok: true }));

app.get("/me", requireAuth, (req, res) => {
  res.json({ uid: req.user.uid });
});
