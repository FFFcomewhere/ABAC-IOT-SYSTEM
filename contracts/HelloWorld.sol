pragma solidity ^0.8.17;

contract HelloWorld {
    string public message;

    constructor(string memory initMessage) {
        message = initMessage;
    }

    function hello() public view returns (string memory) {
        return message;
    }

    function setMessage(string memory newMessage) public payable {
        require(msg.value >= 1 ether, "Not enough Ether provided.");
        message = newMessage;
    }
}
