import * as React from "react";
import {useEffect, useState} from "react";
import style from "@styles/Home.module.css";

export default function App() {
    const [currentAccount, setCurrentAccount] = useState("");

    const checkIfWalletIsConnected = async () => {
        const {ethereum} = window;
        if (!ethereum) {
            console.log("Wallet not connected");
        } else {
            console.log("Wallet connected.", ethereum);
        }

        /*
         * Check if we're authorized to access the user's wallet
         */
        const accounts = await ethereum.request({method: "eth_accounts"});

        if (accounts.length !== 0) {
            const account = accounts[0];
            console.log("Found an authorized account:", account);
            setCurrentAccount(account);
        } else {
            console.log("No authorized account found");
        }
    };

    useEffect(async () => {
        await checkIfWalletIsConnected();
    }, []);

    /**
     * Implement your connectWallet method here
     */
    const connectWallet = async () => {
        try {
            const {ethereum} = window;

            if (!ethereum) {
                alert("Get MetaMask!");
                return;
            }

            const accounts = await ethereum.request({
                method: "eth_requestAccounts",
            });

            console.log("Connected", accounts[0]);
            setCurrentAccount(accounts[0]);
        } catch (error) {
            console.log(error);
        }
    };

    const wave = () => {
    };

    return (
      <div className={style.mainContainer}>
        <div className={style.dataContainer}>
          <div className={style.header}>🖼 Meme art collection</div>
          <div className={style.bio}>
            Hey there {currentAccount}! Meme police 🚓. Send the last meme you
            have saved RIGHT NOW!
          </div>
          <button className={style.waveButton} onClick={wave}>
            Upload 👾
          </button>
          {!currentAccount && (
            <button className={style.waveButton} onClick={connectWallet}>
              Connect Wallet
            </button>
          )}
        </div>
      </div>
    );
}
