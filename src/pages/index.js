import * as React from "react";
import { useEffect, useState } from "react";
import style from "@styles/Home.module.css";
import { ethers } from "ethers";
import { abi as contractABI } from "../utils/MemeArtCollectionPortal.json";

export default function App() {
  const [currentAccount, setCurrentAccount] = useState("");
  const [memes, setMemes] = useState([]);
  const address = "0xAa9e376eeB802f2804cfd7B4190a063D1fa7a6F0";

  const checkIfWalletIsConnected = async () => {
    const { ethereum } = window;
    if (!ethereum) {
      console.log("Wallet not connected");
    } else {
      console.log("Wallet connected.", ethereum);
    }

    /*
     * Check if we're authorized to access the user's wallet
     */
    const accounts = await ethereum.request({ method: "eth_accounts" });

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
    await fetchMemesPost();
  }, []);

  const fetchMemesPost = async () => {
    const { ethereum } = window;
    if (ethereum) {
      const provider = new ethers.providers.Web3Provider(ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(address, contractABI, signer);

      const memes = await contract.getTotalMemes();
      setMemes(memes);
      console.log("Total memes", memes);
    }
  };

  /**
   * Implement your connectWallet method here
   */
  const connectWallet = async () => {
    try {
      const { ethereum } = window;

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

  const publishMeme = async () => {
    const { ethereum } = window;
    if (ethereum) {
      const provider = new ethers.providers.Web3Provider(ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(address, contractABI, signer);

      let txn = await contract.uploadMeme(
        "https://i.ytimg.com/vi/qs95bL3voo0/hqdefault.jpg"
      );
      await txn.wait();
    } else {
      alert("Wallet not connected!");
    }
  };

  return (
    <div className={style.mainContainer}>
      <div className={style.dataContainer}>
        <div className={style.header}>🖼 Meme art collection</div>
        <div className={style.bio}>
          Hey there {currentAccount}! Meme police 🚓. Send the last meme you
          have saved RIGHT NOW!
        </div>
        <button className={style.waveButton} onClick={publishMeme}>
          Upload 👾
        </button>
        {!currentAccount && (
          <button className={style.waveButton} onClick={connectWallet}>
            Connect Wallet
          </button>
        )}
        {memes.map((m) => (
          <img src={m} />
        ))}
      </div>
    </div>
  );
}
