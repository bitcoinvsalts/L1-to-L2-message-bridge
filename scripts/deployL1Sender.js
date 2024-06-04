const { ethers } = require("hardhat");

async function main() {
    const L1Sender = await ethers.getContractFactory("L1Sender");
    const messenger = process.env.REACT_APP_L1_CrossDomainMessengerProxy;  // L1CrossDomainMessengerProxy
    const l2Receiver = process.env.REACT_APP_L2_CONTRACT_ADDRESS;
    const l1Sender = await L1Sender.deploy(messenger, l2Receiver);

    await l1Sender.deployed();
    console.log("L1Sender deployed to:", l1Sender.address);
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
