const { ethers } = require("hardhat");
require('dotenv').config();

async function main() {
  const { RPC_URL, WALLET_PRIVATE_KEY, AAVE_LENDING_POOL, DAI_ADDRESS, UNISWAP_ROUTER } = process.env;

  // Verify RPC_URL by fetching block number
  const provider = new ethers.providers.JsonRpcProvider(RPC_URL);
  const blockNumber = await provider.getBlockNumber();
  console.log("Connected to RPC_URL. Current block number:", blockNumber);

  // Verify WALLET_PRIVATE_KEY by deriving public address
  const wallet = new ethers.Wallet(WALLET_PRIVATE_KEY, provider);
  console.log("Derived wallet address from private key:", wallet.address);

  // Intended address: 0x51ce626FA68Bc3EA417091f71eF79a8Ca66d1B88
  const intendedAddress = "0x51ce626FA68Bc3EA417091f71eF79a8Ca66d1B88";
  if (wallet.address.toLowerCase() !== intendedAddress.toLowerCase()) {
    console.warn("Warning: The derived address does not match the intended address:", intendedAddress);
  } else {
    console.log("Wallet address matches the intended address.");
  }

  // Verify contract addresses have code
  for (const [name, address] of Object.entries({AAVE_LENDING_POOL, DAI_ADDRESS, UNISWAP_ROUTER})) {
    const code = await provider.getCode(address);
    if (code === "0x") {
      console.error(`No contract code found at ${name} address: ${address}. Please verify this address.`);
    } else {
      console.log(`${name} at ${address} is a valid contract.`);
    }
  }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
