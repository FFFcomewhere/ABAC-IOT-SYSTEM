//blockchain
const Web3 = require('web3');
const web3 = new Web3("http://192.168.31.152:8545");
const Attributes = require("../build/contracts/Attributes.json");
let contract;

module.exports = {
    init: init,
    setRootHash: setRootHash,
    getRootHash: getRootHash
}

async function init() {
    //初始化合约
    const id = await web3.eth.net.getId();
    const deployedNetwork = Attributes.networks[id];
    contract = new web3.eth.Contract(Attributes.abi, deployedNetwork.address);
}

async function setRootHash(hash) {
    contract.methods.setRootHash(hash).send({ from: "0xb775F248025b42971670339cF9E22333FE925477" });;
}

async function getRootHash() {
    return await contract.methods.getRootHash().call();
}

async function TestGetRootHash() {
    await init();

    const hash = await getRootHash();
    console.log("hash", hash);
}

TestGetRootHash();