/**
 * Converts a Google Drive share link to a direct image URL.
 * Supports:
 *   https://drive.google.com/file/d/FILE_ID/view?usp=sharing
 *   https://drive.google.com/open?id=FILE_ID
 *   https://drive.google.com/uc?id=FILE_ID  (already direct)
 * Returns the URL unchanged if it's not a Drive link.
 */
export function driveImage(url: string): string {
  if (!url) return "";
  const fileMatch = url.match(/\/file\/d\/([a-zA-Z0-9_-]+)/);
  if (fileMatch) return `https://drive.google.com/uc?export=view&id=${fileMatch[1]}`;
  const openMatch = url.match(/[?&]id=([a-zA-Z0-9_-]+)/);
  if (openMatch && url.includes("drive.google.com")) return `https://drive.google.com/uc?export=view&id=${openMatch[1]}`;
  return url;
}
