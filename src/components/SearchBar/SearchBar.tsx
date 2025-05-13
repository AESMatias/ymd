import type React from 'react';
import styles from './SearchBar.module.css';

interface ButtonProps {
  onClick: () => void;
  children: React.ReactNode;
}

export function Button({ onClick, children }: Readonly<ButtonProps>) {
  return (
    <button type="button" className={styles.btn} onClick={onClick}>
      {children}
    </button>
  );
}

interface Props {
  url: string;
  onUrlChange: (value: string) => void;
  onListFormats: () => void;
}

export function SearchBar({
  url,
  onUrlChange,
  onListFormats,
}: Readonly<Props>) {
  return (
    <div className={styles.mainDiv}>
      <div className={styles.internalDiv}>
        <input
          type="text"
          placeholder="Video URL..."
          value={url}
          onChange={(e) => onUrlChange(e.target.value)}
          className={styles.input}
        />
        <button onClick={onListFormats} disabled={!url} className={styles.btn}>
          List Formats
        </button>
      </div>
    </div>
  );
}
