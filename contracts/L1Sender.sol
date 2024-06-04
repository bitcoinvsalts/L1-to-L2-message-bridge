// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";

interface IL1CrossDomainMessenger {
    function sendMessage(
        address _target,
        bytes memory _message,
        uint32 _minGasLimit
    ) external;
}

contract L1Sender is Ownable {
    address public messenger;
    address public l2Receiver;

    event MessageSent(string message, uint256 timestamp, uint256 blockNumber);

    constructor(address _messenger, address _l2Receiver) {
        messenger = _messenger;
        l2Receiver = _l2Receiver;
    }

    function sendMessage(string memory message) public onlyOwner {
        bytes memory messageData = abi.encodeWithSignature("receiveMessage(string,uint256,uint256)", message, block.timestamp, block.number);
        IL1CrossDomainMessenger(messenger).sendMessage(
            l2Receiver,
            messageData,
            1000000 // Gas limit for the L2 execution
        );
        emit MessageSent(message, block.timestamp, block.number);
    }
}
