// src/views/Home.tsx
import { useState } from 'react';
import {
  listFormats,
  downloadVideoInFormat,
  type Format,
} from '../services/ytDlpService';

export function Home() {
  const [url, setUrl] = useState('');
  const [cookiesPath, setCookiesPath] = useState('');
  const [formats, setFormats] = useState<Format[]>([]);
  const [selectedFormat, setSelectedFormat] = useState('');
  const [statusMessage, setStatusMessage] = useState('');

  const handleListFormats = async () => {
    if (!url) return;
    setStatusMessage('Fetching formats...');
    try {
      const fmts = await listFormats(url, cookiesPath || undefined);
      setFormats(fmts);
      setStatusMessage(fmts.length ? 'Formats loaded.' : 'No formats found.');
    } catch (err) {
      console.error(err);
      setStatusMessage('Error fetching formats.');
    }
  };

  const handleDownload = async () => {
    if (!url || !selectedFormat) return;
    setStatusMessage('Downloading...');
    try {
      await downloadVideoInFormat(url, selectedFormat, cookiesPath || undefined);
      setStatusMessage('Download completed.');
    } catch (err) {
      console.error(err);
      setStatusMessage('Error during download.');
    }
  };

  return (
    <div style={{ maxWidth: 600, margin: '2rem auto', padding: '0 1rem' }}>
      <h1>YT Downloader</h1>

      <input
        type="text"
        placeholder="Video URL..."
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        style={{ width: '100%', padding: '0.5rem', marginBottom: '1rem' }}
      />

      <input
        type="text"
        placeholder="Cookies path (optional)..."
        value={cookiesPath}
        onChange={(e) => setCookiesPath(e.target.value)}
        style={{ width: '100%', padding: '0.5rem', marginBottom: '1rem' }}
      />

      <button type="button" onClick={handleListFormats} disabled={!url}>
        List Formats
      </button>

      {formats.length > 0 && (
        <>
          <select
            value={selectedFormat}
            onChange={(e) => setSelectedFormat(e.target.value)}
            style={{ display: 'block', width: '100%', margin: '1rem 0' }}
          >
            <option value="">-- Select format --</option>
            {formats.map((fmt) => (
              <option key={fmt.format_id} value={fmt.format_id}>
                {fmt.resolution} ({fmt.ext})
              </option>
            ))}
          </select>

          <button type="button"  onClick={handleDownload} disabled={!selectedFormat}>
            Download
          </button>
        </>
      )}

      {statusMessage && <p>{statusMessage}</p>}
    </div>
  );
}
