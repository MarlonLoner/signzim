import { put } from "@vercel/blob";

const allowedTypes = new Set(["image/jpeg", "image/png", "image/webp"]);
const maxBytes = 5 * 1024 * 1024;

export type UploadResult = {
  ok: true;
  url: string;
} | {
  ok: false;
  error: "missing-token" | "invalid-type" | "too-large" | "upload-failed";
};

function hasFile(value: FormDataEntryValue | null): value is File {
  return value instanceof File && value.size > 0;
}

export function getUploadedFiles(formData: FormData, key: string) {
  return formData.getAll(key).filter(hasFile);
}

export async function uploadImageFile(file: File, folder: string): Promise<UploadResult> {
  if (!process.env.BLOB_READ_WRITE_TOKEN?.trim()) {
    return { ok: false, error: "missing-token" };
  }

  if (!allowedTypes.has(file.type)) {
    return { ok: false, error: "invalid-type" };
  }

  if (file.size > maxBytes) {
    return { ok: false, error: "too-large" };
  }

  try {
    const extension = file.name.split(".").pop()?.toLowerCase() || "jpg";
    const safeName = `${Date.now()}-${crypto.randomUUID()}.${extension}`;
    const blob = await put(`${folder}/${safeName}`, file, {
      access: "public",
      addRandomSuffix: true
    });

    return { ok: true, url: blob.url };
  } catch (error) {
    console.error("Unable to upload image", error);
    return { ok: false, error: "upload-failed" };
  }
}
