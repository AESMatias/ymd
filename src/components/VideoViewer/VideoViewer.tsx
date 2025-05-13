import { Format } from '../../services/ytDlpService';
import styles from './VideoViewer.module.css';
import { useEffect, useState } from 'react';
import { VideoElement } from '../../components/VideoElement/VideoElement';

interface Props {
  formats: Format[];
}

export function VideoViewer({ formats }: Readonly<Props>) {



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
    <div className={styles.VideoViewerDiv}>
      {virtualFormats.length === 0 ? (
        <p>Your queue is empty</p>
      ) : (
        <div>
          {virtualFormats.map((fmt) => (<VideoElement formatInfo={fmt} />))}
        </div>
      )}
    </div>
  );
}