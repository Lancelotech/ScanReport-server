import { onRequest } from "firebase-functions/v2/https";
import { initializeApp } from "firebase-admin/app";
import { app } from "./app.js";

initializeApp();

export const api = onRequest(
  { region: "us-central1", cors: true },
  app
);
