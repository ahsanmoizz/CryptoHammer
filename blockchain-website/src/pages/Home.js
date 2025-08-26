import React, { useState } from 'react';
import connectWallet from './ConnectWallet.js'; // Function to connect wallet
import './Home.css';
const Home = () => {
  const [account, setAccount] = useState(null);
  const [contract, setContract] = useState(null); // Store contract instance

  const handleConnectWallet = async () => {
    try {
      const { signer, contract: connectedContract } = await connectWallet();

      if (signer) {
        const userAccount = await signer.getAddress();
        setAccount(userAccount);

        // Save the contract instance to state
        setContract(connectedContract);

        console.log('Connected Account:', userAccount);
      }
    } catch (error) {
      console.error('Error connecting wallet:', error);
    }
  };

  return (
    <div>
      <h1>Auction DApp</h1>
      <p>
        <b>
        "Empowering transparent and trustless auctions for a fair bidding experience. <br/>Bid, win, and trade seamlessly on the blockchain!"</b>
      </p>
      {!account ? (
        <button onClick={handleConnectWallet}>Connect Wallet</button>
      ) : (
        <div>
          <p>Connected Account: {account}</p>
          {/* Display contract information */}
          {contract && <p>Contract Address: {contract.address}</p>}
        </div>
      )}
    </div>
  );
};

export default Home;
