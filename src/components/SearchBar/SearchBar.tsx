import type React from 'react';
import styles from './SearchBar.module.css';
import {MyCustomLogo} from '../../components/MyCustomLogo/MyCustomLogo'; 
import { useState } from 'react';
import { homeDir } from '@tauri-apps/api/path';
import {  } from '@tauri-apps/api'; // Solo writeTextFile, eliminamos createDir

interface ButtonProps {
  handleLogin: () => void;
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


  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  const handleLogin = async (username: string, password: string) => {
    try {
      // Obtener el directorio home usando Tauri
      const home = await homeDir();
      const netrcPath = `${home}.netrc`;
      
      // Crear el contenido del archivo .netrc
      const netrcContent = `machine youtube login ${username} password ${password}\n`;
      
      // Escribir el archivo .netrc

      //await writeTextFile(netrcPath, netrcContent);
      
      console.log('Credenciales guardadas en:', netrcPath); //Cuidado, no veo los logs, intentar con alertas
      setIsLoginModalOpen(false);
    } catch (error) {
      console.error('Error al guardar las credenciales:', error);
    }
  };



  return (
    <div className={styles.mainDiv}>

      <div className={styles.logoTitleSection}>
         <h1>
             <MyCustomLogo className={styles.youtubeSVG} />
         </h1>
         <h1 className={styles.title} onClick={handleLogin}>
             YT Downloader
         </h1>
      </div>



      <div className={styles.internalDiv}>
        <input
          type="text"
          placeholder="Video or Playlist URL..."
          value={url}
          onChange={(e) => onUrlChange(e.target.value)}
          className={styles.input}
        />
        <button onClick={onListFormats} disabled={!url} className={styles.btn}>
          + Add
        </button>
      </div>

    </div>
  );
}
