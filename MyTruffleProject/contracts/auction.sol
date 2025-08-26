// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";

contract Auction2 is ReentrancyGuard {
    address[] public highestBidderWallet;
    address public highestBidder;
    address public immutable auctioner;
    uint public duration;
    uint public tokens;
    uint public highestBid;
    mapping(address => uint) public balance;
    enum State { Active, Freeze }
    State public state;

    event AuctionStateChange(State newState);
    event NewBidPlaced(address bidder, uint amount);
    event AuctionFinalized(address winner, uint winningBid);
    event Withdrawal(address withdrawer, uint amount);

    constructor(uint endtime, uint initialTokens) {
        auctioner = msg.sender;
        tokens = initialTokens;
        duration = block.timestamp + endtime;
        state = State.Active;
        emit AuctionStateChange(state);
    }

    modifier isActive() {
        require(state == State.Active, "Auction is not active");
        require(block.timestamp < duration, "Auction has ended");
        _;
    }

    modifier isOwner() {
        require(msg.sender == auctioner, "Only auctioner can call this");
        _;
    }

    // Function to create a new auction
    function createAuction(uint _tokens) public isOwner {
        require(_tokens > 0, "Tokens must be greater than zero");
        tokens = _tokens;
        state = State.Active;
        emit AuctionStateChange(state);
    }

    // Function to check auction state
    function getAuctionState() public view returns (State) {
        return state;
    }

    // Function for placing bids
    function placeBid() public payable nonReentrant isActive {
        require(msg.value > highestBid, "Bid must be higher than the current highest bid");
        require(msg.sender != address(0), "Bidder address cannot be null");

        // Refund the previous highest bidder
        if (highestBidder != address(0)) {
            balance[highestBidder] += highestBid;
        }

        // Update the highest bid and bidder
        
        highestBidder = msg.sender;
        highestBid = msg.value;

        emit NewBidPlaced(msg.sender, msg.value);
    }

    // Function to finalize the auction
    function finalizeBid() public nonReentrant {
        require(block.timestamp > duration, "Auction is still ongoing");
        require(msg.sender == auctioner, "Only auctioner can finalize the auction");
        require(state == State.Active, "Auction has already been finalized");

        state = State.Freeze;
        emit AuctionStateChange(state);

        // Transfer the highest bid to the auctioner
        payable(auctioner).transfer(highestBid);

        // Add the winner to the highest bidder wallet
        highestBidderWallet.push(highestBidder);

        emit AuctionFinalized(highestBidder, highestBid);
    }

    // Function for bidders to withdraw their refunded balance
    function withdraw() public nonReentrant {
        uint refund = balance[msg.sender];
        require(refund > 0, "No balance to withdraw");

        // Reset the balance before transferring to prevent reentrancy
        balance[msg.sender] = 0;
        payable(msg.sender).transfer(refund);

        emit Withdrawal(msg.sender, refund);
    }
}
