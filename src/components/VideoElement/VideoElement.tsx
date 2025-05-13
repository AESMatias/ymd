import { Format } from '../../services/ytDlpService';
import styles from './VideoElement.module.css';


interface Props {
  // This component expects a single 'formatInfo' object of type Format
  formatInfo: Format;
}

export function VideoElement({ formatInfo }: Readonly<Props>) {

    let provisionalImageUrl = 'https://i.ytimg.com/vi/47vORPiiC3g/hqdefault.jpg?sqp=-oaymwEbCKgBEF5IVfKriqkDDggBFQAAiEIYAXABwAEG&rs=AOn4CLChiq-G5c6o2y8t_Z1ZBLMLibkvHw';
    
    if (!formatInfo ) {
      return null; // We handle the case where formatInfo is not provided
    }

    const { format_id, resolution, ext } = formatInfo;

  return (
    <div className={styles.videoElement} key={format_id}>
      <h1>
        {resolution} - ({ext})
      </h1>

      <img
        className={styles.videoThumbnail}
        src={provisionalImageUrl}
        alt="Video Thumbnail"
      />

    </div>
  );
}