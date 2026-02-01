import axios from "axios";
import FormData from "form-data";

interface ExtractDocumentParams {
  fileBuffer: Buffer;
  filename: string;
  type: string;
}

export async function extractDocument({
  fileBuffer,
  filename,
  type,
}: ExtractDocumentParams) {
  const apiKey = "test";

  const form = new FormData();
  form.append("File", fileBuffer, { filename });
  form.append("Type", type);

  const headers: Record<string, string> = {
    ...form.getHeaders(),
  };

  if (apiKey) {
    headers.Authorization = `Bearer ${apiKey}`;
  }

  const response = await axios.post(
    "https://api.lancelotech.com/api/DocumentExtraction/extract",
    form,
    {
      headers,
      // Adjust if their API can be slow
      timeout: 60_000,
    }
  );

  return response.data;
}

