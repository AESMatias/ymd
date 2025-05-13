// src/views/Home.tsx
import { useState } from 'react';
import { listFormats, downloadVideoInFormat, Format } from '../services/ytDlpService';
import { SearchBar } from '../components/SearchBar/SearchBar';
import { VideoViewer } from '../components/VideoViewer/VideoViewer';
import { DownloadOptions } from '../components/DowloadOptions/DownloadOptions';

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
      setStatusMessage('Error fetching formats: ' + (err as Error).message);
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
    <div style={{ padding: '0rem', width: '100%',
      display: 'flex', flexDirection: 'column', alignItems: 'center',
      backgroundColor: 'red'
     }}>

      <SearchBar
        url={url}
        cookiesPath={cookiesPath}
        onUrlChange={setUrl}
        onCookiesPathChange={setCookiesPath}
        onListFormats={handleListFormats}
      />

      <h1>YT Downloader</h1>

      <VideoViewer formats={formats} />

      <DownloadOptions
        formats={formats}
        selectedFormat={selectedFormat}
        onFormatChange={setSelectedFormat}
        onDownload={handleDownload}
      />

      {statusMessage && <p>{statusMessage}</p>}
    </div>
  );
}
