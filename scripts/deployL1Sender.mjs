import hardhat from 'hardhat';
const { ethers } = hardhat;

async function main() {
    try {
        const L1Sender = await ethers.getContractFactory("L1Sender");
        const messenger = process.env.REACT_APP_L1_CrossDomainMessengerProxy;  // L1CrossDomainMessengerProxy
        const l2Receiver = process.env.REACT_APP_L2_CONTRACT_ADDRESS;
        const l1Sender = await L1Sender.deploy(messenger, l2Receiver);

        await l1Sender.deployed();
        console.log("L1Sender deployed to:", l1Sender.address);
        process.exit(0);
    } catch (error) {
        console.error("Error deploying L1Sender:", error);
        process.exit(1);
    }
}

main();