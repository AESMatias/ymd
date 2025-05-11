use std::process::Command;
use anyhow::{Result, Context};
use serde_json::Value;
use crate::commands::Format;

pub fn get_formats(
    url: &str,
    cookies: Option<String>,
) -> Result<Vec<Format>> {
    let mut cmd: Command = Command::new("yt-dlp");
    cmd.args(["-j", "--no-warnings", "--no-playlist"]);
    if let Some(path) = cookies.as_deref() {
        cmd.args(["--cookies", path]);
    }
    cmd.arg(url);

    let output = cmd.output().context("Failed to run yt-dlp for listing formats")?;
    if !output.status.success() {
        return Err(anyhow::anyhow!("yt-dlp format listing failed"));
    }
    let stdout = String::from_utf8_lossy(&output.stdout);
    let json: Value = serde_json::from_str(&stdout).context("Failed parsing yt-dlp JSON")?;
    let empty_vec = vec![];
    let fmts = json.get("formats").and_then(Value::as_array).unwrap_or(&empty_vec);
    let list = fmts.iter().filter_map(|f: &Value| {
        Some(Format {
            format_id: f.get("format_id")?.as_str()?.to_string(),
            ext: f.get("ext")?.as_str()?.to_string(),
            resolution: f.get("format")?.as_str().map(|s| s.to_string())?,
        })
    }).collect();
    Ok(list)
}

pub fn download_video(
    url: &str,
    format_id: &str,
    cookies: Option<String>,
) -> Result<()> {
    let mut cmd: Command = Command::new("yt-dlp");
    cmd.args(["-f", format_id]);
    if let Some(path) = cookies.as_deref() {
        cmd.args(["--cookies", path]);
    }
    cmd.arg(url);

    let status = cmd.status().context("Failed to run yt-dlp for download")?;
    if status.success() {
        Ok(())
    } else {
        Err(anyhow::anyhow!("yt-dlp download failed"))
    }
}