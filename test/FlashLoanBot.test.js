const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("FlashLoanBot", function () {
  let flashLoanBot;
  let owner;

  before(async () => {
    [owner] = await ethers.getSigners();

    const { AAVE_LENDING_POOL, DAI_ADDRESS, UNISWAP_ROUTER, PROFIT_THRESHOLD } = process.env;
    const FlashLoanBot = await ethers.getContractFactory("FlashLoanBot");
    flashLoanBot = await FlashLoanBot.deploy(
      AAVE_LENDING_POOL,
      DAI_ADDRESS,
      UNISWAP_ROUTER,
      PROFIT_THRESHOLD
    );
    await flashLoanBot.deployed();
  });

  it("Should deploy correctly and set addresses", async function () {
    const { AAVE_LENDING_POOL, DAI_ADDRESS, UNISWAP_ROUTER } = process.env;

    // Normalize addresses to lowercase for comparison
    expect((await flashLoanBot.lendingPool()).toLowerCase()).to.equal(AAVE_LENDING_POOL.toLowerCase());
    expect((await flashLoanBot.dai()).toLowerCase()).to.equal(DAI_ADDRESS.toLowerCase());
    expect((await flashLoanBot.uniswapRouter()).toLowerCase()).to.equal(UNISWAP_ROUTER.toLowerCase());
  });

  it("Should revert if flash loan is attempted without a real environment", async function () {
    await expect(
      flashLoanBot.executeFlashLoan(ethers.utils.parseEther("1"))
    ).to.be.reverted; // On a real test environment, use Aave test setups.
  });
});
