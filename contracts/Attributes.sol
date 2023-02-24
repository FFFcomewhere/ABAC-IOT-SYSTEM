pragma solidity ^0.8.17;

import "merkle-patricia-tree/contracts/MerklePatriciaProof.sol";

contract Attributes {
    bytes32[] public policyTree;
    mapping(bytes32 => bool) public policyExists;
    uint256 public policyCount;

    constructor() {}

    function addPolicy(string memory policy) public {
        bytes32 policyHash = keccak256(bytes(policy));
        require(!policyExists[policyHash], "Policy already exists");

        policyExists[policyHash] = true;
        policyTree.push(policyHash);
        policyCount++;
    }

    function getPolicyRoot() public view returns (bytes32) {
        return MerklePatriciaProof.getMerkleRoot(policyTree);
    }
}
