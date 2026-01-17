import { onRequest } from "firebase-functions/v2/https";
import { initializeApp } from "firebase-admin/app";
import { app } from "./app.js";
import { SMTP_HOST, SMTP_USER, SMTP_PASS, SMTP_PORT } from "./services/secrets.js";

initializeApp();

export const api = onRequest(
  {
    region: "us-central1",
    cors: true,
    secrets: [SMTP_HOST, SMTP_USER, SMTP_PASS, SMTP_PORT],
  },
  app
);
