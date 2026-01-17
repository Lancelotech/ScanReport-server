import crypto from "crypto";
import { getFirestore, FieldValue, Timestamp } from "firebase-admin/firestore";
import { sendOtpEmail } from "./mailer.js";
import { issueCustomTokenForEmail } from "./authTokens.js";
function db() {
  return getFirestore();
}


function normalizeEmail(email: string) {
  return String(email || "").trim().toLowerCase();
}

function generateCode() {
  // 6 цифр
  return String(Math.floor(100000 + Math.random() * 900000));
}

function hashCode(code: string, salt: string) {
  return crypto.createHash("sha256").update(`${salt}:${code}`).digest("hex");
}

export async function requestOtp(params: { email: string; ip?: string }) {
  console.log("[REQUEST_OTP]", { email: params.email });
  const email = normalizeEmail(params.email);
  if (!email || !email.includes("@")) {
    // намеренно одинаковый “успешный” ответ, но можно добавить ok:true без деталей
    console.log("[REQUEST_OTP] INVALID_EMAIL", { email: params.email });
    return { sent: false };
  }

  // антиспам: 1 код в N секунд на email
  const ref = await db().collection("otp_requests").doc(email);
  const snap = await ref.get();
  const now = Date.now();

  if (snap.exists) {
    const data = snap.data() as { lastSentAt?: Timestamp } | undefined;
    const lastSentAt = data?.lastSentAt?.toMillis?.() ?? 0;
    if (now - lastSentAt < 30_000) {
      // слишком часто — не отправляем, но возвращаем ok:true
      console.log("[REQUEST_OTP] TOO_FREQUENT", { email: params.email });
      return { sent: false };
    }
  }

  const code = generateCode();
  const salt = crypto.randomBytes(16).toString("hex");
  const codeHash = hashCode(code, salt);

  // 10 минут
  const expiresAt = new Date(now + 10 * 60_000);
  console.log("[REQUEST_OTP] SETTING_OTP", { email: params.email, code, salt, codeHash, expiresAt });
  await ref.set(
    {
      codeHash,
      salt,
      attempts: 0,
      lastSentAt: FieldValue.serverTimestamp(),
      expiresAt, // можно настроить TTL индекс в Firestore по этому полю
      ip: params.ip ?? null,
    },
    { merge: true }
  );
  console.log("[REQUEST_OTP] SENT_OTP", { email: params.email, code });
  await sendOtpEmail({ to: email, code });
  console.log("[REQUEST_OTP] SENT_OTP_SUCCESS", { email: params.email, code });
  return { sent: true };
}

export async function verifyOtp(params: { email: string; code: string; ip?: string }) {
  const email = normalizeEmail(params.email);
  const code = String(params.code || "").trim();

  if (!email || !code) return { ok: false, error: "INVALID_INPUT" };

  const ref = db().collection("otp_requests").doc(email);
  const snap = await ref.get();
  if (!snap.exists) return { ok: false, error: "INVALID_CODE" };

  const data = snap.data() as { expiresAt?: Timestamp; attempts?: number; codeHash?: string; salt?: string } | undefined;
  const expiresAt = data?.expiresAt?.toDate?.() ?? null;
  if (!expiresAt || expiresAt.getTime() < Date.now()) {
    await ref.delete().catch(() => {/* noop */});
    return { ok: false, error: "CODE_EXPIRED" };
  }

  const attempts = Number(data?.attempts || 0);
  if (attempts >= 5) return { ok: false, error: "TOO_MANY_ATTEMPTS" };

  const expected = String(data?.codeHash || "");
  const salt = String(data?.salt || "");
  const actual = hashCode(code, salt);

  if (actual !== expected) {
    await ref.set({ attempts: attempts + 1 }, { merge: true });
    return { ok: false, error: "INVALID_CODE" };
  }
  const { uid, customToken } = await issueCustomTokenForEmail(email);
  // успех: удаляем OTP и возвращаем “verified”
  await ref.delete().catch(() => {/* noop */});
  return { ok: true, uid, customToken };
}
