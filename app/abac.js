const pathPolicy = "./config/policy.csv";
const pathModel = "./config/model.conf";
const { newEnforcer } = require('casbin');
const { SequelizeAdapter } = require('casbin-sequelize-adapter');


const abac = async (sub, obj, act) => {
    const adapter = await SequelizeAdapter.newAdapter({
        dialect: 'mysql',
        host: 'localhost',
        username: 'root',
        port: 3306,
        password: 'password',
        database: 'base1',
        tableName: 'policy',
    },
        true,
    );
    const enforcer = await newEnforcer(pathModel, adapter);

    const res = await enforcer.enforce(sub, obj, act);
    console.log("res ", res);
    return res;
}


const abacTest = async () => {
    //根据abac规则进行判断
    const sub = "root"; // the user that wants to access a resource.
    const obj = "TV"; // the resource that is going to be accessed.
    const act = "write"; // the operation that the user performs on the resource.
    if (await abac(sub, obj, act)) {
        console.log("allow");
    } else {
        console.log("deny");
        return;
    }
}

abacTest();