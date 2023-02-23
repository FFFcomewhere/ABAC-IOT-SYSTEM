const Web3 = require('web3');
const web3 = new Web3("http://172.25.144.1:8545");
const Attributes = require("../build/contracts/Attributes.json");
const abac = require("./abac");
const server = require("./server");
let attributes;
const fs = require('fs');

//初始化合约
const init = async () => {
}

//向链上发送policy
const sendPolicy = async () => {
}

const main = async () => {
    //init
    // const id = await web3.eth.net.getId();
    // const deployedNetwork = Attributes.networks[id];
    // attributes = new web3.eth.Contract(Attributes.abi, deployedNetwork.address);

    server.server();

    //读取policy  并发送到链上
    let policy = "";
    const readFile = require("util").promisify(fs.readFile);

    try {
        const data = await readFile(pathPolicy, "utf8");
        policy = data;
    } catch (err) {
        console.error(err);
    }

    // attributes.methods.setPolicy(policy).send({ from: "0xe3189575B0D7F76d7943C0Db75C9021bc1a69BA6" });

    // //读取policy 取hash并与链上hash验证
    // const hashPolicy = web3.utils.keccak256(policy);
    // const hashPolicyChain = await attributes.methods.getHashPolicy().call();
    // const policyChain = await attributes.methods.getPolicy().call();
    // console.log("policy \n", policy, "\n policyChain \n", policyChain);

    // console.log("hashPolicy", hashPolicy, "hashPolicyChain", hashPolicyChain);
    // console.log(hashPolicy == hashPolicyChain);
}

main();