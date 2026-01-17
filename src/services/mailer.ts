import nodemailer from "nodemailer";
import { SMTP_HOST, SMTP_USER, SMTP_PASS, SMTP_PORT } from "./secrets.js";

export function createTransport() {
  const host = SMTP_HOST.value();
  const user = SMTP_USER.value();
  const pass = SMTP_PASS.value();
  const port = Number(SMTP_PORT.value() || "587");

  return nodemailer.createTransport({
    host,
    port,
    secure: false, // для 587 обычно false + STARTTLS
    auth: { user, pass },
    requireTLS: true,
  });
}

export async function sendOtpEmail(params: { to: string; code: string }) {
  console.log("[SEND_OTP_EMAIL]", { to: params.to, code: params.code });
  const transporter = createTransport();
  console.log("[SEND_OTP_EMAIL] TRANSPORTER", { transporter });
  const subject = "Your ScanReport verification code";
  const text = `Your verification code: ${params.code}\nIt expires in 10 minutes.`;
  console.log("[SEND_OTP_EMAIL] TEXT", { text });
  await transporter.sendMail({
    from: SMTP_USER.value(),
    to: params.to,
    subject,
    text,
  });
  console.log("[SEND_OTP_EMAIL] SENT_OTP_EMAIL_SUCCESS", { to: params.to, code: params.code });
}
