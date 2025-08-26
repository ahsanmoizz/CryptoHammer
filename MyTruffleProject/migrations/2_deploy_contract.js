const Auction2 = artifacts.require("Auction2");

module.exports = function (deployer) {
  // Set the parameters for the constructor
  const endtime = 172800; // Auction duration in seconds (e.g., 1 hour)
  const initialTokens = 100; // Initial tokens for the auction

  // Deploy the contract with the constructor parameters
  deployer.deploy(Auction2, endtime, initialTokens);
};
