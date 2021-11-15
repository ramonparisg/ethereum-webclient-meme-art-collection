import * as React from "react";
import style from "@styles/Home.module.css";

export default function App() {
    const wave = () => {
    };

    return (
      <div className={style.mainContainer}>
        <div className={style.dataContainer}>
          <div className={style.header}>👋 Hey there!</div>

          <div className={style.bio}>
            I am farza and I worked on self-driving cars so that's pretty cool
            right? Connect your Ethereum wallet and wave at me!
          </div>

          <button className={style.waveButton} onClick={wave}>
            Wave at Me
          </button>
        </div>
      </div>
    );
}
