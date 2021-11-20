import * as React from "react";
import { useEffect, useState } from "react";
import style from "@styles/Home.module.css";
import { ethers } from "ethers";
import { abi as contractABI } from "../utils/MemeArtCollectionPortal.json";

export default function App() {
  const [currentAccount, setCurrentAccount] = useState("");
  const [posts, setPosts] = useState([]);
  const address = "0xB53B2eC1252d20d6fF4Eb7d34154A3bAb35Bf640";

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
    if (!currentAccount) {
      await fetchMemesPost();
    }
  }, [currentAccount]);

  const fetchMemesPost = async () => {
    const { ethereum } = window;
    if (ethereum) {
      const provider = new ethers.providers.Web3Provider(ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(address, contractABI, signer);

      const posts = await contract.getPosts();
      console.log("Total memes", posts);
      setPosts(mapPosts(posts));
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

  const mapPosts = (totalPosts) =>
    totalPosts?.map(({ meme, ...post }) => ({
      author: post.author,
      timestamp: new Date(post.timestamp * 1000),
      meme: {
        imgUrl: meme.imgUrl,
        title: meme.title,
        description: meme.description,
      },
    }));

  const postMeme = async () => {
    const { ethereum } = window;
    if (ethereum) {
      const provider = new ethers.providers.Web3Provider(ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(address, contractABI, signer);

      const meme = {
        imgUrl: "https://i.ytimg.com/vi/qs95bL3voo0/hqdefault.jpg",
        title: "Milky Chávez",
        description: "Chávez with a bag of milk on his head",
      };


      let txn = await contract.publishPost(meme);
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
        <button className={style.waveButton} onClick={postMeme}>
          Upload 👾
        </button>
        {!currentAccount && (
          <button className={style.waveButton} onClick={connectWallet}>
            Connect Wallet
          </button>
        )}
        {posts.map(({ meme, ...post }, i) => (
          <img key={i} src={meme.imgUrl} />
        ))}
      </div>
    </div>
  );
}
