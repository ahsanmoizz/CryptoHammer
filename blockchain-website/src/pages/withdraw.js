import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import './withdraw.css';

const CONTRACT_ADDRESS = '0xF7cF2593C7Dc1aCECaFDa2030Ae5d0B2a5C85c13';
const CONTRACT_ABI = 
  [
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



const Withdraw = () => {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [balance, setBalance] = useState('0'); // Store balance in wei as a string
  const [userAddress, setUserAddress] = useState('');

  // Fetch user balance from contract
  const getBalance = async (contract, address) => {
    try {
      const userBalance = await contract.balance(address);
      setBalance(userBalance.toString()); // Store balance in wei
    } catch (error) {
      console.error('Error fetching balance:', error);
      setBalance('0');
    }
  };

  const handleWithdraw = async () => {
    try {
      setLoading(true);
      setMessage('');

      // Connect to Ethereum provider
      const provider = new ethers.BrowserProvider(window.ethereum);
      await provider.send('eth_requestAccounts', []); // Request access to user accounts
      const signer = provider.getSigner();
      const address = await signer.getAddress();

      setUserAddress(address); // Save user address

      // Connect to the contract
      const contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer);

      // Fetch and check balance
      await getBalance(contract, address);

      if (balance === '0') {
        setMessage('No funds available for withdrawal.');
        return;
      }

      // Call the withdraw function
      const transaction = await contract.withdraw();
      await transaction.wait();

      setMessage(`Withdrawal successful! ${balance} wei refunded.`);
      setBalance('0'); // Reset balance after withdrawal
    } catch (error) {
      console.error('Error during withdrawal:', error);
      setMessage('Error withdrawing funds.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Fetch the user's balance on component load
    const fetchUserBalance = async () => {
      if (window.ethereum) {
        try {
          const provider = new ethers.BrowserProvider(window.ethereum);
          const signer = provider.getSigner();
          const address = await signer.getAddress();

          setUserAddress(address); // Save user address

          const contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, provider);
          await getBalance(contract, address);
        } catch (error) {
          console.error('Error initializing balance:', error);
        }
      }
    };
    fetchUserBalance();
  }, []);

  return (
    <div className="withdraw-container">
      <h1>Withdraw Funds</h1>
      <p>Your Refundable Balance: {balance} wei</p>
      <p>Connected Wallet: {userAddress || 'Not connected'}</p>
      <button onClick={handleWithdraw} disabled={loading}>
        {loading ? 'Withdrawing...' : 'Withdraw'}
      </button>
      {message && <p>{message}</p>}
    </div>
  );
};

export default Withdraw;
