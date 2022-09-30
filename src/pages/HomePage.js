import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ethers } from "ethers";
import NFT from '../utils/NFT.json';

export default function HomePage() {

  const [currentAccount, setCurrentAccount] = useState("");
  const checkIfWalletIsConnected = async() => {
  const { ethereum } = window;

    if (!ethereum) {
      console.log("Asegurate de tener metamask!");
      return;
    } else {
      console.log("Objeto ethereum recibido", ethereum);
    }
    const accounts = await ethereum.request({ method: 'eth_accounts' });

    if (accounts.length !== 0) {
      const account = accounts[0];
      console.log("Cuenta autorizada:", account);
      setCurrentAccount(account);
    } else {
      console.log("No se encontro una cuenta autorizada");
    }
  }

  const connectWallet = async () => {
    try {
      const { ethereum } = window;

      if (!ethereum) {
        alert("Get MetaMask!");
        return;
      }
      const accounts = await ethereum.request({ method: "eth_requestAccounts" });
      console.log("Conectado", accounts[0]);
      setCurrentAccount(accounts[0]); 
    } catch (error) {
      console.log(error);
    }
  }

  const askContractToMintNft = async () => {
    const CONTRACT_ADDRESS = "0xC443829492f3692b4910068fEE2337a769BFD2C9";
  
    try {
      const { ethereum } = window;
  
      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const connectedContract = new ethers.Contract(CONTRACT_ADDRESS, NFT.abi, signer);
  
        console.log("Habilitando el pago de gas")
        let nftTxn = await connectedContract.mintNFT();
  
        console.log("En proceso de minado")
        await nftTxn.wait();
        
        console.log(`Minado exitoso, esta es la transaccion: https://goerli.etherscan.io/tx/${nftTxn.hash}`);
  
      } else {
        console.log("El objeto no existe!");
      }
    } catch (error) {
      console.log(error)
    }
  }

  const renderNotConnectedContainer = () => (
    <button onClick={connectWallet} className="cta-button connect-wallet-button">
      Conectar al Wallet
    </button>
  );

  useEffect(() => {
    checkIfWalletIsConnected();
  }, [])

  return (
    <div className="App">
      <div className="container">
        <div className="header-container">         
          {currentAccount === "" 
            ? renderNotConnectedContainer()
            : (
              <div className="container">
                <h1>Contrato para generar un NFT fijo</h1>
                <h3>Outputs en consola </h3>

              </div>
            )
          }
          <button onClick={askContractToMintNft} className="cta-button connect-wallet-button">
            Mintear NFT
          </button>
        </div>
      </div>
    </div>
  );
};

