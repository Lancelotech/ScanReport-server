import { Router } from "express";
import { requestOtp, verifyOtp } from "../services/otpService.js";

const router = Router();

router.post("/request", async (req, res) => {
  const { email } = req.body ?? {};
  const result = await requestOtp({ email, ip: req.ip });
  // Никогда не говорим “такого email нет” — всегда одинаковый ответ
  return res.status(200).json({ ok: true, ...result });
});

router.post("/verify", async (req, res) => {
  const { email, code } = req.body ?? {};
  const result = await verifyOtp({ email, code, ip: req.ip });
  if (!result.ok) return res.status(400).json(result);
  return res.json(result);
});

export default router;
