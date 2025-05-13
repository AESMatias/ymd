use tauri::command;
use serde::Serialize;
use crate::yt_dlp::downloader::{get_formats, download_video};

#[derive(Serialize)]
pub struct Format {
    pub format_id: String,
    pub ext: String,
    pub resolution: String,
}

#[command]
pub fn list_formats(
    url: String,
) -> Result<Vec<Format>, String> {
    get_formats(&url).map_err(|e| e.to_string())
}

#[command]
pub fn download_video_in_format(
    url: String,
    format_id: String,
) -> Result<(), String> {
    download_video(&url, &format_id).map_err(|e| e.to_string())
}