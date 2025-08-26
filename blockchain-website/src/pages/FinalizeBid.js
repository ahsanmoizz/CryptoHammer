import React, { useState } from 'react';
import { ethers } from 'ethers';
import './FinalizeBid.css';
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

const FinalizeBid=()=>{
const [loading,Setloading] = useState(false);
const [message,Setmessage]=useState('');
 const handleFinalizeBid=async()=>{
try{Setloading(true);
Setmessage('');
const provider= new ethers.BrowserProvider(window.ethereum);
const signer= await provider.getSigner();
const contract = new ethers.Contract(CONTRACT_ADDRESS,CONTRACT_ABI,signer);
const transaction = await contract.finalizeBid();
await transaction.wait();
Setmessage("auction finalized successfully"); 
}
catch(error){
console.log(error);
alert("Auction is not finalized ");
}
finally{
Setloading(false);  
}
}   
return (
  <div className="finalize-bid">
    <h1>Auction Manager</h1>
    <div>
      <button onClick={handleFinalizeBid} disabled={loading}>
        {loading ? 'Finalizing...' : 'Finalize Auction'}
      </button>
    </div>
    </div>)
}
export default FinalizeBid;