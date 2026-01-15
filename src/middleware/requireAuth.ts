import type { Request, Response, NextFunction } from "express";
import { getAuth } from "firebase-admin/auth";

declare global {
  namespace Express {
    interface Request {
      user: { uid: string };
    }
  }
}

export async function requireAuth(req: Request, res: Response, next: NextFunction) {
  try {
    const header = req.headers.authorization ?? "";
    const match = header.match(/^Bearer (.+)$/);

    if (!match) {
      return res.status(401).json({ error: "Missing Authorization: Bearer <token>" });
    }

    const decoded = await getAuth().verifyIdToken(match[1]);
    req.user = { uid: decoded.uid };
    return next();
  } catch {
    return res.status(401).json({ error: "Invalid token" });
  }
}
