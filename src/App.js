import React, { useEffect, useState } from 'react';
import twitterLogo from './assets/twitter-logo.svg';
import './App.css';

// Constants
const TWITTER_HANDLE = 'laszlo_ratesic';
const TWITTER_LINK = `https://twitter.com/${TWITTER_HANDLE}`;
const TEST_GIFS = [
  'https://media.giphy.com/media/dZCa79nBsVDU1sWwbm/giphy.gif',
  'https://media.giphy.com/media/OAYtfrwCvdVjW/giphy.gif',
  'https://media.giphy.com/media/5HRvXqKEVrZEA/giphy.gif',
  'https://media.giphy.com/media/26gsspfbt1HfVQ9va/giphy.gif',
  'https://media.giphy.com/media/KPgOYtIRnFOOk/giphy.gif'
]

const App = () => {
  //State
  const [walletAddress, setWalletAddress] = useState(null);

  // Actions
  const checkWalletConnect = async () => {
    try {
      const { solana } = window;

      if (solana) {
        if (solana.isPhantom) {
          console.log('Phantom wallet found!');
          const response = await solana.connect({ onlyIfTrusted: true});
          console.log(
            'Connected with Public Key:',
            response.publicKey.toString()
          );

          // Set the user's publicKey in state to be used later!
          setWalletAddress(response.publicKey.toString());
        }
      } else {
        alert('Solana object not found! Get a Phantom Wallet 👻');
      }
    } catch (error) {
      console.error(error);
    }
  };

  const connectWallet = async () => {
    const { solana } = window;

    if (solana) {
      const response = await solana.connect();
      console.log('Connected with Public Key:', response.publicKey.toString());
      setWalletAddress(response.publicKey.toString());
    }
  };

  // We want to render the UI when user hasn't connected yet

  const renderNotConnectedContainer = () => (
    <button className="cta-button connect-wallet-button" onClick={connectWallet}>
      Connect to Wallet
    </button>
  );

  const renderConnectedContainer = () => (
    <div className="connected-container">
      <div className="gif-grid">
        {TEST_GIFS.map(gif => (
          <div className="gif-item" key={gif}>
            <img src={gif} alt={gif} />
            </div>
        ))}
      </div>
    </div>
  );

  // UseEffects
  useEffect(() => {
    const onLoad = async () => {
      await checkWalletConnect();
    };
    window.addEventListener('load', onLoad);
    return() => window.removeEventListener('load', onLoad);
  }, []);

  return (
    <div className="App">
      <div className={walletAddress ? 'authed-container' : 'container'}>
        <div className="header-container">
          <p className="header">Koko's Guerilla Art GIF Portal</p>
          <p className="sub-text">
            View the world's pre-eminent geurilla art GIFs straight from the metaverse ✨
          </p>
          {!walletAddress && renderNotConnectedContainer()}
          {walletAddress && renderConnectedContainer()}
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
