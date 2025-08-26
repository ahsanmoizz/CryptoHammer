import React, { useEffect, useState } from 'react';
import { ethers, formatEther } from 'ethers'; // Import formatEther directly
import './AuctionList.css';

const CONTRACT_ADDRESS = ' 0xF7cF2593C7Dc1aCECaFDa2030Ae5d0B2a5C85c13'; // Replace with your contract address
const CONTRACT_ABI = [
  {
    "inputs": [],
    "name": "bidders",
    "outputs": [
      {
        "internalType": "address[]",
        "name": "",
        "type": "address[]"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "highestBidder",
    "outputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "highestBid",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  }
];

const AuctionList = () => {
  const [bidders, setBidders] = useState([]);
  const [highestBidder, setHighestBidder] = useState(null);
  const [highestBid, setHighestBid] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAuctionData = async () => {
      try {
        const provider = new ethers.BrowserProvider(window.ethereum); // v6 BrowserProvider
        const signer = await provider.getSigner();
        const contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer);

        // Fetch the list of bidders
        const biddersList = await contract.bidders();
        setBidders(biddersList);

        // Fetch the highest bidder and bid
        const highestBidderAddress = await contract.highestBidder();
        const highestBidAmount = await contract.highestBid();

        setHighestBidder(highestBidderAddress);
        setHighestBid(formatEther(highestBidAmount)); // Use formatEther from ethers v6

        setLoading(false);
      } catch (error) {
        console.error("Error fetching auction data:", error);
        setLoading(false);
      }
    };

    fetchAuctionData();
  }, []);

  return (
    <div className="auction-list-container">
      <h1>Auction Bidders</h1>
      {loading ? (
        <p>Loading auction data...</p>
      ) : (
        <>
          <h2>Highest Bidder: {highestBidder}</h2>
          <h3>Highest Bid: {highestBid} ETH</h3>

          <h3>Bidders:</h3>
          <ul>
            {bidders.length === 0 ? (
              <p>No bids placed yet.</p>
            ) : (
              bidders.map((bidder, index) => (
                <li key={index}>
                  {bidder}
                </li>
              ))
            )}
          </ul>
        </>
      )}
    </div>
  );
};

export default AuctionList;
