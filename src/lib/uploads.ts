import path from "node:path";

/**
 * Where uploaded images live on disk.
 *
 * In production this must be a Railway Volume mounted on the app service — container
 * filesystems (including `public/`) are ephemeral and wiped on every deploy, so files
 * written there would 404 after the next release. Railway sets `RAILWAY_VOLUME_MOUNT_PATH`
 * automatically once a volume is attached (see README for the `railway volume attach` step).
 *
 * In local dev, falls back to a gitignored `.uploads/` folder at the project root.
 */
export const UPLOAD_DIR =
  process.env.UPLOAD_DIR ??
  (process.env.RAILWAY_VOLUME_MOUNT_PATH
    ? path.join(process.env.RAILWAY_VOLUME_MOUNT_PATH, "uploads")
    : path.join(process.cwd(), ".uploads"));

export const CONTENT_TYPES: Record<string, string> = {
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".png": "image/png",
  ".webp": "image/webp",
  ".gif": "image/gif",
};

export const ALLOWED_UPLOAD_TYPES = new Set(Object.values(CONTENT_TYPES));
export const MAX_UPLOAD_SIZE = 5 * 1024 * 1024; // 5MB
