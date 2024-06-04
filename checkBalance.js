const { ethers } = require("ethers");
require('dotenv').config();

const { OPTIMISM_SEPOLIA_URL, PRIVATE_KEY } = process.env;

async function main() {
  const provider = new ethers.providers.JsonRpcProvider(OPTIMISM_SEPOLIA_URL);
  const wallet = new ethers.Wallet(PRIVATE_KEY, provider);
  const balance = await wallet.getBalance();

  console.log(`Balance of ${wallet.address}: ${ethers.utils.formatEther(balance)} ETH`);
}

main().catch(error => {
  console.error(error);
  process.exit(1);
});
