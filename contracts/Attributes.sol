pragma solidity ^0.8.17;

contract Attributes {
    string public policy;
    bytes32 public hashPolicy;

    constructor(string memory initPolicy) {
        policy = initPolicy;
        hashPolicy = hash(policy);
    }

    function setPolicy(string memory newPolicy) public payable {
        policy = newPolicy;
        hashPolicy = hash(policy);
    }

    function getPolicy() public view returns (string memory) {
        return policy;
    }

    function getHashPolicy() public view returns (bytes32) {
        return hashPolicy;
    }

    function hash(string memory message) public pure returns (bytes32) {
        return keccak256(abi.encodePacked(message));
    }
}
