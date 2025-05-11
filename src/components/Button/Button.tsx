import type React from 'react';
import styles from './Button.module.css';

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
