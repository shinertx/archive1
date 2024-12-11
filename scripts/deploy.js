const { ethers } = require("hardhat");
require('dotenv').config();

async function main() {
  const { AAVE_LENDING_POOL, DAI_ADDRESS, UNISWAP_ROUTER, PROFIT_THRESHOLD } = process.env;
  
  if (!AAVE_LENDING_POOL || !DAI_ADDRESS || !UNISWAP_ROUTER || !PROFIT_THRESHOLD) {
    console.error("Please set AAVE_LENDING_POOL, DAI_ADDRESS, UNISWAP_ROUTER, and PROFIT_THRESHOLD in your .env");
    process.exit(1);
  }

  const FlashLoanBot = await ethers.getContractFactory("FlashLoanBot");
  const flashLoanBot = await FlashLoanBot.deploy(
    AAVE_LENDING_POOL,
    DAI_ADDRESS,
    UNISWAP_ROUTER,
    PROFIT_THRESHOLD
  );

  await flashLoanBot.deployed();
  console.log("FlashLoanBot deployed to:", flashLoanBot.address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
