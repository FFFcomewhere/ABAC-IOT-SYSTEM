//blockchain
const Web3 = require('web3');
const web3 = new Web3("http://127.0.0.1:8545");
const Attributes = require("../contract/build/contracts/Attributes.json");
let contract;
let accounts;
module.exports = {
    init: init,
    setRootHash: setRootHash,
    getRootHash: getRootHash
}
const gasLimit = 300000;
async function init() {
    //初始化合约
    const id = await web3.eth.net.getId();
    const deployedNetwork = Attributes.networks[id];
    contract = new web3.eth.Contract(Attributes.abi, deployedNetwork.address);
    accounts = await web3.eth.getAccounts();
}

async function setRootHash(hash) {
    console.log("accounts", accounts[0]);
    //console.log(" init setRootHash begin");
    const options = {
      from: accounts[0],
      gas: gasLimit // 添加 gas 限制参数
    };
    contract.methods.setRootHash(hash).send(options);;
    //console.log(" init setRootHash end");
}

async function getRootHash() {
    return await contract.methods.getRootHash().call();
}

async function TestRootHash() {
    await init();
    const hash = "1213";
    await setRootHash(hash);


    const getHash = await getRootHash();
    console.log("hash", getHash);
}


//TestRootHash();