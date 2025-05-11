import { invoke } from "@tauri-apps/api/core";

export interface Format {
  format_id: string;
  ext: string;
  resolution: string;
}

export function listFormats(
  url: string,
  cookiesPath?: string
): Promise<Format[]> {
  return invoke('list_formats', { url, cookies: cookiesPath ?? null });
}

export function downloadVideoInFormat(
  url: string,
  formatId: string,
  cookiesPath?: string
): Promise<void> {
  return invoke('download_video_in_format', {
    url,
    formatId,
    cookies: cookiesPath ?? null,
  });
}
