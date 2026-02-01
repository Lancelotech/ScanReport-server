import express from "express";
import cors from "cors";
import otpRoutes from "./routes/otpRoutes.js";
import documentRoutes from "./routes/documentRoutes.js";

export const app = express();

app.use(cors({ origin: true }));
app.use(express.json());

app.get("/health", (_req, res) => res.json({ ok: true }));

app.use("/otp", otpRoutes);
app.use("/document", documentRoutes);
