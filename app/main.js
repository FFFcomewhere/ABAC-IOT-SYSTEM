const server = require("./server");

//初始化合约
const init = async () => {
}

//向链上发送policy 
const sendPolicy = async () => {
}

const main = async () => {
    //后端服务
    server.server();



    //读取policy  并发送到链上



    attributes.methods.setPolicy(policy).send({ from: "0xe3189575B0D7F76d7943C0Db75C9021bc1a69BA6" });

    //读取policy 取hash并与链上hash验证
    const hashPolicy = web3.utils.keccak256(policy);
    const hashPolicyChain = await attributes.methods.getHashPolicy().call();
    const policyChain = await attributes.methods.getPolicy().call();
    console.log("policy \n", policy, "\n policyChain \n", policyChain);

    console.log("hashPolicy", hashPolicy, "hashPolicyChain", hashPolicyChain);
    console.log(hashPolicy == hashPolicyChain);
}


main();