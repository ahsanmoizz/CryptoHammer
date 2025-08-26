import { ethers } from 'ethers';

// Replace this with your contract's ABI and address
const contractAddress = '0xF7cF2593C7Dc1aCECaFDa2030Ae5d0B2a5C85c13'; // Your deployed contract address
const contractABI = [
    {
        "inputs": [
            { "internalType": "uint256", "name": "endtime", "type": "uint256" },
            { "internalType": "uint256", "name": "initialTokens", "type": "uint256" }
        ],
        "stateMutability": "nonpayable",
        "type": "constructor"
    },
    {
        "anonymous": false,
        "inputs": [
            { "indexed": false, "internalType": "enum Auction2.State", "name": "newState", "type": "uint8" }
        ],
        "name": "AuctionStateChange",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            { "indexed": false, "internalType": "address", "name": "bidder", "type": "address" },
            { "indexed": false, "internalType": "uint256", "name": "amount", "type": "uint256" }
        ],
        "name": "NewBidPlaced",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            { "indexed": false, "internalType": "address", "name": "winner", "type": "address" },
            { "indexed": false, "internalType": "uint256", "name": "winningBid", "type": "uint256" }
        ],
        "name": "AuctionFinalized",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            { "indexed": false, "internalType": "address", "name": "withdrawer", "type": "address" },
            { "indexed": false, "internalType": "uint256", "name": "amount", "type": "uint256" }
        ],
        "name": "Withdrawal",
        "type": "event"
    },
    {
        "inputs": [],
        "name": "getAuctionState",
        "outputs": [{ "internalType": "enum Auction2.State", "name": "", "type": "uint8" }],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "highestBid",
        "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "highestBidder",
        "outputs": [{ "internalType": "address", "name": "", "type": "address" }],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "highestBidderWallet",
        "outputs": [{ "internalType": "address[]", "name": "", "type": "address[]" }],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "duration",
        "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "tokens",
        "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "auctioner",
        "outputs": [{ "internalType": "address", "name": "", "type": "address" }],
        "stateMutability": "view",
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
        "name": "withdraw",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            { "internalType": "address", "name": "", "type": "address" }
        ],
        "name": "balance",
        "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }],
        "stateMutability": "view",
        "type": "function"
    }
]

    


  


let provider;
let signer;
let contract;

const connectWallet = async () => {
  // Check if window.ethereum is available (i.e., MetaMask is installed)
  if (window.ethereum) {
    try {
      // Initialize the provider and signer
      provider = new ethers.BrowserProvider(window.ethereum);
      signer = await provider.getSigner();

      // Request account access from MetaMask
      await window.ethereum.request({ method: 'eth_requestAccounts' });

      // Create the contract instance
      contract = new ethers.Contract(contractAddress, contractABI, signer);
      console.log('Connected to wallet!');
      
      return { provider, signer, contract };
    } catch (error) {
      console.error('Failed to connect wallet:', error);
    }
  } else {
    console.error('MetaMask not detected. Please install it.');
    alert('Please install MetaMask to connect your wallet.');
  }
};

export default connectWallet;
