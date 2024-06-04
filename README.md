# L1-to-L2-message-bridge

A dApp to send messages from L1 Sepolia to Optimism Sepolia and display info about it.

# How to install and run the dapp.

Create .env and edit the following values from your Infuria account:

- SEPOLIA_URL
- OPTIMISM_SEPOLIA_URL
- PRIVATE_KEY

## Install the npm packages:
```npm i```

## Deploy the L2 contract
```npx hardhat run scripts/deployL2Receiver.js --network optimismSepolia```

Copy the L2 contract address to REACT_APP_L2_CONTRACT_ADDRESS in .env

## Deploy the L1 contract
```npx hardhat run scripts/deployL1Sender.js --network sepolia```

Copy the L1 contract address to REACT_APP_L1_CONTRACT_ADDRESS in .env


## Run the dapp
```npm start```
