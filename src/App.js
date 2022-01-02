import React, { useEffect } from 'react';
import twitterLogo from './assets/twitter-logo.svg';
import './App.css';

// Constants
const TWITTER_HANDLE = 'laszlo_ratesic';
const TWITTER_LINK = `https://twitter.com/${TWITTER_HANDLE}`;

const App = () => {

  // This function hold the logic to determine if there is a Phantom Wallet connected or not

  const checkWalletConnect = async () => {
    try {
      const { solana } = window;
      if (solana) {
        if (solana.isPhantom) {
          console.log('Phantom wallet found!');

          // solana object gives us a function to connect directly to user's wallet!
          const response = await solana.connect({ onlyIfTrusted: true});
          console.log(
            'Connected with Public Key:',
            response.publicKey.toString()
          );
        }
      } else {
        alert('Solana object not found! Get a Phantom Wallet 👻');
      }
    } catch (error) {
      console.error(error);
    }
  };

  // When the component first mounts, we check to see if we have a connected Phantom Wallet

  useEffect(() => {
    const onLoad = async () => {
      await checkWalletConnect();
    };
    window.addEventListener('load', onLoad);
    return() => window.removeEventListener('load', onLoad);
  }, []);

  return (
    <div className="App">
      <div className="container">
        <div className="header-container">
          <p className="header">Koko's Guerilla Art GIF Portal</p>
          <p className="sub-text">
            View the world's pre-eminent geurilla art GIFs straight from the metaverse ✨
          </p>
        </div>
        <div className="footer-container">
          <img alt="Twitter Logo" className="twitter-logo" src={twitterLogo} />
          <a
            className="footer-text"
            href={TWITTER_LINK}
            target="_blank"
            rel="noreferrer"
          >{`built by @${TWITTER_HANDLE}`}</a>
        </div>
      </div>
    </div>
  );
};

export default App;
