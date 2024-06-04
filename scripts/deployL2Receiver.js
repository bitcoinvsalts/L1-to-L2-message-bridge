const { ethers } = require("hardhat");

async function main() {
    const L2Receiver = await ethers.getContractFactory("L2Receiver");
    const l2Receiver = await L2Receiver.deploy();

    await l2Receiver.deployed();
    console.log("L2Receiver deployed to:", l2Receiver.address);
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
