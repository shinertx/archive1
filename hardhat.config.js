require('dotenv').config();
require('@nomicfoundation/hardhat-toolbox');

const { RPC_URL, WALLET_PRIVATE_KEY } = process.env;

if (!RPC_URL || !WALLET_PRIVATE_KEY) {
  console.error("Please set RPC_URL and WALLET_PRIVATE_KEY in your .env file");
  process.exit(1);
}

module.exports = {
  solidity: "0.8.19",
  networks: {
    sepolia: {
      url: RPC_URL,
      accounts: [WALLET_PRIVATE_KEY],
      // Set gasPrice as a number (in wei)
      gasPrice: 2000000000 // 2 gwei
    }
  },
  mocha: {
    timeout: 20000
  }
};
