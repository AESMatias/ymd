import { Format } from '../../services/ytDlpService';
import styles from './DownloadOptions.module.css';

interface Props {
  formats: Format[];
  selectedFormat: string;
  onFormatChange: (value: string) => void;
  onDownload: () => void;
}

export function DownloadOptions({
  formats,
  selectedFormat,
  onFormatChange,
  onDownload,
}: Readonly<Props>) {
  if (formats.length === 0) return null;

  return (
    <div className={styles.mainDiv} >
      <select
        value={selectedFormat}
        onChange={(e) => onFormatChange(e.target.value)}
        style={{ display: 'block', width: '100%', margin: '1rem 0' }}
      >
        <option value="">-- Select format --</option>
        {formats.map((fmt) => (
          <option key={fmt.format_id} value={fmt.format_id}>
            {fmt.resolution} ({fmt.ext})
          </option>
        ))}
      </select>

      <button onClick={onDownload} disabled={!selectedFormat}>
        Download
      </button>
    </div>
  );
}