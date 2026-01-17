import { defineSecret } from "firebase-functions/params";

export const SMTP_HOST = defineSecret("SMTP_HOST");
export const SMTP_USER = defineSecret("SMTP_USER");
export const SMTP_PASS = defineSecret("SMTP_PASS");
export const SMTP_PORT = defineSecret("SMTP_PORT");
