import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import {
    l2ProviderUrl,
    l1ContractAddress,
    l2ContractAddress
} from '../config';

import L1SenderABI from '../abis/L1Sender.json';
import L2ReceiverABI from '../abis/L2Receiver.json';

function MessageSender() {
    const [message, setMessage] = useState('');
    const [status, setStatus] = useState('');
    const [receivedMessage, setReceivedMessage] = useState('No message received on L2 yet.');
    const [transactionHash, setTransactionHash] = useState(null);
    const [timestamp, setTimestamp] = useState(null);
    const [blockNumber, setBlockNumber] = useState(null);

    const sendMessage = async () => {
        if (!window.ethereum) {
            setStatus('MetaMask is not installed.');
            return;
        }
    
        try {
            await window.ethereum.request({ method: 'eth_requestAccounts' });
            const web3Provider = new ethers.providers.Web3Provider(window.ethereum);
            const signer = web3Provider.getSigner();
            const l1SenderContract = new ethers.Contract(l1ContractAddress, L1SenderABI, signer);
    
            setStatus('Sending message...');
            const gasEstimate = await l1SenderContract.estimateGas.sendMessage(message);
            const tx = await l1SenderContract.sendMessage(message, { gasLimit: gasEstimate.add(10000) });
            console.log('Transaction sent:', tx);
            setTransactionHash(tx.hash);
    
            const receipt = await tx.wait();
            console.log('Transaction confirmed:', receipt);
            setStatus('Message sent and confirmed');
    
            console.log(receipt);
    
            // Get timestamp and block number from the transaction receipt
            if (receipt.timestamp) { // Add a null check for receipt.timestamp
                setTimestamp(receipt.timestamp.toString());
            }
            if (receipt.blockNumber) { // Add a null check for receipt.blockNumber
                setBlockNumber(receipt.blockNumber.toString());
            }
    
            checkL2Message();
        } catch (error) {
            console.error('Error sending message:', error);
            setStatus(`Error: ${error.message}`);
        }
    };

    const checkL2Message = async () => {
        try {
            const l2Provider = new ethers.providers.JsonRpcProvider(l2ProviderUrl);
            const l2ReceiverContract = new ethers.Contract(l2ContractAddress, L2ReceiverABI, l2Provider);

            // Listen for the MessageReceived event and update the receivedMessage state variable
            l2ReceiverContract.on("MessageReceived", (message, timestamp, blockNumber) => {
                console.log('Message received on L2:', message, timestamp, blockNumber);
                setReceivedMessage(message);
                setTimestamp(timestamp.toString()); // Convert timestamp to a string
                setBlockNumber(blockNumber.toString()); // Convert blockNumber to a string
            });

        } catch (error) {
            console.error('Error checking L2 message:', error);
            setStatus(`Error checking L2 message: ${error.message}`);
        }
    };

    // Use useEffect to start
    useEffect(() => {
        checkL2Message();
    }, []);

    return (
        <div>
            <input type="text" value={message} onChange={(e) => setMessage(e.target.value)} />
            <button onClick={sendMessage}>Send Message</button>
            <p>Status: {status}</p>
            <p>Message Received on L2: {receivedMessage}</p>
            {timestamp && <p>Timestamp: {new Date(parseInt(timestamp) * 1000).toLocaleString()}</p>}
            {blockNumber && <p>Block Number: {blockNumber}</p>}
            {transactionHash && <p>Transaction Hash: <a href={`https://sepolia.etherscan.io/tx/${transactionHash}`} target="_blank" rel="noopener noreferrer">{transactionHash}</a></p>}
        </div>
    );
}

export default MessageSender;
