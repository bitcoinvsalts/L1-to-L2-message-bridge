import hardhat from 'hardhat';
const { ethers } = hardhat;

async function main() {
    try {
        const L2Receiver = await ethers.getContractFactory("L2Receiver");
        const l2Receiver = await L2Receiver.deploy();

        await l2Receiver.deployed();
        console.log("L2Receiver deployed to:", l2Receiver.address);
        process.exit(0);
    } catch (error) {
        console.error("Error deploying L2Receiver:", error);
        process.exit(1);
    }
}

main();
