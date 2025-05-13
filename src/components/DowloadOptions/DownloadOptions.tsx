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
  statusMessage
}: Readonly<Props>) {
  // if (formats.length === 0) return null;


  // Once we have the formats, we change the virtualFormats to the formats in all the code below!
  const virtualFormats: Format[] = [
    {
      format_id: '1',
      resolution: '1080p',
      ext: 'mp4',
    },
    {
      format_id: '2',
      resolution: '720p',
      ext: 'mp4'
    },
    {
      format_id: '3',
      resolution: '480p',
      ext: 'mp4'
    },
  ];

  return (
    <div className={styles.mainDiv}>
        <div className={styles.optionsDiv}>
            <h4 className={styles.title}>Download Options</h4>
            <select
                className={styles.formatSelectNative}
                value={selectedFormat}
                onChange={(e) => onFormatChange(e.target.value)}
                // You might still want a default empty option
            >
                <option value="">-- Select format --</option> {/* Default/placeholder option */}
                {virtualFormats.map((fmt) => (
                    <option key={fmt.format_id} value={fmt.format_id}>
                        {/* Content of each dropdown item */}
                         {/* You can only put text here */}
                        {`${fmt.resolution || 'N/A'} (${fmt.ext})`}
                    </option>
                ))}
            </select>
        </div>
        
        <div className={styles.buttonDiv}>
            <button
                onClick={onDownload}
                disabled={!selectedFormat}
                className={styles.downloadButton}
          >
              Download
          </button>

      {statusMessage && <p className={statusMessage.includes('Error') 
        ? styles.errorMessage : styles.successMessage}>
                    {statusMessage}
                 </p>}
        </div>


    </div>
  );
}