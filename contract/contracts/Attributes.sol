pragma solidity ^0.8.17;

contract Attributes {
    string public rootHash;

    constructor() {}

    function setRootHash(string memory _rootHash) public {
        rootHash = _rootHash;
    }

    function getRootHash() public view returns (string memory) {
        return rootHash;
    }
}
