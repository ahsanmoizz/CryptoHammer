📄 README.md for Auction2
# 🏆 CryptoHammer/Auction DApp (Solidity + React)

A decentralized auction platform built with **Solidity** and **React (CRA frontend)**. Participants can place bids with ETH, the highest bidder wins after the auction ends, and all non-winning bidders can safely withdraw their refunds.

---

## 🚀 Overview

This smart contract implements a simple **English Auction**:
- Auctioner starts an auction with tokens.
- Users place bids (must be higher than the current bid).
- Previous highest bidder is refunded automatically.
- After auction ends, the **highest bidder wins**, and the auctioner receives the winning bid.
- Other participants can withdraw their refunds securely.

---

## ⚙️ Smart Contract

### Key Features
- **Bidding**: Only higher bids are accepted.
- **Refund System**: Outbid bidders can withdraw ETH safely.
- **Auction Lifecycle**: Active → Freeze after finalization.
- **Reentrancy Protection**: Uses OpenZeppelin `ReentrancyGuard`.
- **Events**: Logs all state changes, bids, finalizations, and withdrawals.

### Tech
- Solidity `^0.8.20`
- OpenZeppelin `ReentrancyGuard`
- Truffle / Hardhat (deployment)

---

## 🎨 Frontend

The frontend is a **React CRA app** with:
- Connect wallet (MetaMask)
- Start auction (owner only)
- Place bids
- View current highest bid
- Finalize auction (owner only)
- Withdraw refunded bids

---


📸 Screenshots 
![Lottery UI](blockchain-website/public/home-image.png)

## 🛠️ Setup & Installation

### 1. Clone Repository
```bash
git clone https://github.com/ahsanmoizz/CryptoHammer.git
cd Smart-Contracts

2. Compile & Deploy
truffle compile
truffle migrate --network sepolia

3. Run Frontend
cd frontend
npm install
npm start

🔗 Resources

Solidity Docs

OpenZeppelin Contracts

Truffle Suite

📜 License

MIT License

💡 Built with ❤️ using Solidity, OpenZeppelin, Truffle, and React.