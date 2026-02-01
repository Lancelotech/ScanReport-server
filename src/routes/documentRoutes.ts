import { Request, Router } from "express";
import { getStorage } from "firebase-admin/storage";
import { extractDocument } from "../services/documentExtraction.js";

const router = Router();

async function extractWithBuffer(
  buffer: Buffer,
  originalname: string,
  mimetype: string,
  type: string
): Promise<{ destination: string; lancelotech: unknown }> {
  const bucket = getStorage().bucket();
  const destination = `uploads/${Date.now()}-${originalname}`;

  await bucket.file(destination).save(buffer, {
    contentType: mimetype,
    metadata: { type },
  });

  const lancelotech = await extractDocument({
    fileBuffer: buffer,
    filename: originalname,
    type,
  });

  return { destination, lancelotech };
}

// POST /document (no path) → point client to correct endpoint
router.post("/", (_req, res) => {
  res.status(400).json({
    ok: false,
    error:
      "Use POST /api/document/extract with JSON body: fileBase64, fileName, mimeType, Type (or documentType)",
  });
});

// POST /document/extract — JSON body with base64 file (no multer)
router.post("/extract", async (req: Request, res): Promise<void> => {
  try {
    const body = req.body as {
      fileBase64?: string;
      fileName?: string;
      mimeType?: string;
      Type?: string;
      documentType?: string;
    };
    const fileBase64 = body?.fileBase64;
    const fileName = (body?.fileName ?? "file").toString();
    const mimeType = (body?.mimeType ?? "application/octet-stream").toString();
    const type = (body?.Type ?? body?.documentType ?? "").toString();

    if (!fileBase64 || typeof fileBase64 !== "string") {
      res.status(400).json({ ok: false, error: "fileBase64 is required" });
      return;
    }
    if (!type) {
      res.status(400).json({
        ok: false,
        error: "Type or documentType is required",
      });
      return;
    }

    const buffer = Buffer.from(fileBase64, "base64");
    const { destination, lancelotech } = await extractWithBuffer(
      buffer,
      fileName,
      mimeType,
      type
    );

    res.json({
      ok: true,
      storage: { path: destination },
      lancelotech,
    });
  } catch (error) {
    console.error("[DOCUMENT_EXTRACT_ERROR]", error);
    res.status(500).json({ ok: false, error: "Internal error" });
  }
});

export default router;

