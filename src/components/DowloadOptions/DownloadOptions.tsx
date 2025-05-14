// TODO: This download option is focused on video so we must create an alternative for music.
// TODO: We must also make a video and music oriented one, although this one must be planned. 

import { useState } from 'react';
import { Format } from '../../services/ytDlpService';
import styles from './DownloadOptions.module.css';
import { invoke } from "@tauri-apps/api/core";

interface Props {
  url: string;
  formats: Format[];
  selectedFormat: string;
  onFormatChange: (value: string) => void;
  onDownload: (formatId: string) => void;
}

function getPreferredFormats(formats: Format[]): Format[] {
  const priorityResolutions = ['360p', '480p', '720p', '1080p'];
  const selected: Record<string, Format> = {};

  for (const fmt of formats) {
    const resolution = fmt.resolution?.match(/\d+p/)?.[0];
    if (!resolution || !priorityResolutions.includes(resolution)) continue;
    if (!selected[resolution] && fmt.ext === 'mp4') {
      selected[resolution] = fmt;
    }
  }

  return Object.values(selected).sort((a, b) => {
    const getRes = (res?: string) => parseInt(res?.match(/\d+/)?.[0] || '0');
    return getRes(a.resolution) - getRes(b.resolution);
  });
}

export function DownloadOptions({
  url,
  formats,
  selectedFormat,
  onFormatChange,
  onDownload,
}: Readonly<Props>) {
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleDownload = async () => {
    if (!selectedFormat) return;

    setIsLoading(true);
    setErrorMessage('');

    try {
      await invoke('download_video_in_format', {
        url,
        formatId: selectedFormat,
      });
      onDownload(selectedFormat);
    } catch (error: any) {
      console.error("Error al descargar:", error);
      setErrorMessage('Hubo un error durante la descarga. Intenta nuevamente.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.mainDiv}>
      <div className={styles.optionsDiv}>
        <h4 className={styles.title}>Download Options</h4>
        <label htmlFor="formatSelect" className={styles.label}>Formato:</label>
        <select
          id="formatSelect"
          className={styles.formatSelectNative}
          value={selectedFormat}
          onChange={(e) => onFormatChange(e.target.value)}
        >
          <option value="">Select format</option>
          {getPreferredFormats(formats).map((fmt) => (
            <option key={fmt.format_id} value={fmt.format_id}>
              {`${fmt.format_id} - ${fmt.resolution || 'N/A'} (${fmt.ext})`}
            </option>
          ))}
        </select>
      </div>

      <div className={styles.buttonDiv}>
        <button
          onClick={handleDownload}
          disabled={!selectedFormat || isLoading}
          className={styles.downloadButton}
        >
          {isLoading ? 'Downloading...' : 'Download'}
        </button>
      </div>

      {errorMessage && (
        <div className={styles.errorMessage}>
          {errorMessage}
        </div>
      )}
    </div>
  );
}
