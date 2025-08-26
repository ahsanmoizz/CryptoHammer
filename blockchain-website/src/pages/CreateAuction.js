import React, { useState } from 'react';
import { ethers, parseUnits } from 'ethers'; // Import parseUnits directly
import './CreateAuction.css';

const CONTRACT_ADDRESS = '0xF7cF2593C7Dc1aCECaFDa2030Ae5d0B2a5C85c13'; // Replace with your contract address
const CONTRACT_ABI = [
  
    {
        "inputs": [
            { "internalType": "uint256", "name": "endtime", "type": "uint256" },
            { "internalType": "uint256", "name": "initialTokens", "type": "uint256" }
        ],
        "stateMutability": "nonpayable",
        "type": "constructor"
    },
    {
        "inputs": [],
        "name": "auctioner",
        "outputs": [
            { "internalType": "address", "name": "", "type": "address" }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "bidders",
        "outputs": [
            { "internalType": "address[]", "name": "", "type": "address[]" }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "finalizeBid",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "highestBid",
        "outputs": [
            { "internalType": "uint256", "name": "", "type": "uint256" }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "highestBidder",
        "outputs": [
            { "internalType": "address", "name": "", "type": "address" }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "highestBidderWallet",
        "outputs": [
            { "internalType": "address[]", "name": "", "type": "address[]" }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "state",
        "outputs": [
            { "internalType": "uint8", "name": "", "type": "uint8" }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "tokens",
        "outputs": [
            { "internalType": "uint256", "name": "", "type": "uint256" }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "duration",
        "outputs": [
            { "internalType": "uint256", "name": "", "type": "uint256" }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "withdraw",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            { "internalType": "uint256", "name": "_tokens", "type": "uint256" }
        ],
        "name": "createAuction",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "placeBid",
        "outputs": [],
        "stateMutability": "payable",
        "type": "function"
    }
];


const CreateAuction = () => {
  const [tokens, setTokens] = useState('');

  const handleCreateAuction = async () => {
    try {
      if (!tokens || isNaN(tokens)) {
        alert("Please enter a valid token amount");
        return;
      }
  
      // Connect to MetaMask
      const provider = new ethers.BrowserProvider(window.ethereum); // Use BrowserProvider in ethers v6
      const signer = await provider.getSigner();
  
      // Connect to the smart contract
      const auctionContract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer);
  
      // Log current auctioneer address for debugging
      const auctioneer = await auctionContract.auctioner();
      console.log('Auctioneer Address:', auctioneer);
  
      // Call createAuction with parsed token amount
      const transaction = await auctionContract.createAuction(parseUnits(tokens, 18)); // Use parseUnits directly
      await transaction.wait();
  
      alert("Auction created successfully!");
    } catch (error) {
      console.error('Error during auction creation:', error);
      alert("Error while creating auction. Check the console for details.");
    }
  };
  
  return (
    <div className="create-auction">
      <h1>Create Auction</h1>
      <input
        type="number"
        placeholder="Enter token amount"
        value={tokens}
        onChange={(e) => setTokens(e.target.value)}
      />
      <button onClick={handleCreateAuction}>Create Auction</button>
    </div>
  );
};

export default CreateAuction; 