const pathPolicy = "./config/policy.csv";
const pathModel = "./config/model.conf";
const { newEnforcer } = require('casbin');
const { exec } = require('child_process');


const abac = async (sub, obj, act) => {
    const enforcer = await newEnforcer(pathModel, pathPolicy);

    const res = await enforcer.enforce(sub, obj, act);
    console.log("res ", res);
    return res;
}


const abacTest = async () => {

    //根据abac规则进行判断
    const sub = "alice"; // the user that wants to access a resource.
    const obj = "data2"; // the resource that is going to be accessed.
    const act = "read"; // the operation that the user performs on the resource.
    if (await abac(sub, obj, act)) {
        console.log("allow");
    } else {
        console.log("deny");
        return;
    }
}