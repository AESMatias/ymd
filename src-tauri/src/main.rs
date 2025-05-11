// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

mod commands;
mod yt_dlp;

fn main() {
  tauri::Builder::default()
    .invoke_handler(tauri::generate_handler![
      commands::list_formats,
      commands::download_video_in_format
    ])
    .run(tauri::generate_context!())
    .expect("Failed to launch Tauri application");
}