// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract L2Receiver {
    event MessageReceived(
        string message,
        uint256 timestamp,
        uint256 blockNumber
    );

    function receiveMessage(
        string memory message,
        uint256 timestamp,
        uint256 blockNumber
    ) public {
        emit MessageReceived(message, timestamp, blockNumber);
    }
}