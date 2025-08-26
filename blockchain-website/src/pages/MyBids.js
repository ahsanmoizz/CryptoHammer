import React, { useState } from 'react';
import { ethers, parseEther } from 'ethers'; // Import parseEther directly
import './MyBids.css';
const CONTRACT_ADDRESS = '0xF7cF2593C7Dc1aCECaFDa2030Ae5d0B2a5C85c13';
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

const MyBids = () => {
  const [bidAmount, setBidAmount] = useState('');

  const handlePlaceBid = async () => {
    try {
        if (!bidAmount || isNaN(bidAmount)) {
            alert('Please enter a valid bid amount in ETH');
            return;
        }

        console.log('Bid Amount:', bidAmount);
        const provider = new ethers.BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();

        console.log('Connected Network:', await provider.getNetwork());
        const contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer);

        console.log('Parsed Ether Value:', parseEther(bidAmount));

        const transaction = await contract.placeBid({
            value: parseEther(bidAmount),
            gasLimit: 300000, // Optional: Adjust based on your contract's gas usage
        });

        await transaction.wait();
        alert('Bid placed successfully!');
    } catch (error) {
        console.error('Error placing bid:', error);
        alert(`Error: ${error.message}`);
    }
};

  return (
    <div className="my-bids">
      <h1>Place a Bid</h1>
      <input
        type="text"
        placeholder="Bid Amount (in ETH)"
        value={bidAmount}
        onChange={(e) => setBidAmount(e.target.value)}
      />
      <button onClick={handlePlaceBid}>Place Bid</button>
    </div>
  );
};

export default MyBids; 