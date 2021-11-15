import * as React from "react";
import style from "@styles/Home.module.css";

export default function App() {
    const wave = () => {
    };

    return (
      <div className={style.mainContainer}>
        <div className={style.dataContainer}>
          <div className={style.header}>🖼 Meme art collection</div>

          <div className={style.bio}>
            Hey there! Meme police 🚓. Send the last meme you have saved RIGHT NOW!
          </div>

          <button className={style.waveButton} onClick={wave}>
            Upload 👾
          </button>
        </div>
      </div>
    );
}
