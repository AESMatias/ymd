import { invoke } from "@tauri-apps/api/core";

export interface Format {
  format_id: string;
  ext: string;
  resolution: string;
}

export function listFormats(
  url: string,
): Promise<Format[]> {
  return invoke('list_formats', { url });
}

export function downloadVideoInFormat(
  url: string,
  formatId: string,
): Promise<void> {
  return invoke('download_video_in_format', {
    url,
    formatId,
  });
}
