import { Format } from '../../services/ytDlpService';
import styles from './VideoViewer.module.css';

interface Props {
  formats: Format[];
}

export function VideoViewer({ formats }: Readonly<Props>) {
  return (
    <div className={styles.VideoViewerDiv}>
      {formats.length === 0 ? (
        <p>Your queue is empty</p>
      ) : (
        <ul>
          {formats.map((fmt) => (
            <li key={fmt.format_id}>
              {fmt.resolution} ({fmt.ext})
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}