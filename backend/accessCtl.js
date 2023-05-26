const pathModel = "./config/model.conf";


const leveldown = require('leveldown');
const levelup = require('levelup');
const { BaseTrie } = require('merkle-patricia-tree');
const { SequelizeAdapter } = require('casbin-sequelize-adapter');
const { newEnforcer } = require('casbin');

const { EventEmitter } = require('events');
const { promisify } = require('util');
const { sha3 } = require('web3-utils');
const SqlString = require('sqlstring');
const MysqlEvents = require('mysql-events');

const attributes = require('./attributes');

// 初始化LevelDB数据库
const db = levelup(leveldown('./levelDB'));
const tree = new BaseTrie(db); // 初始化MPT

let enforcer;
let policyWatcher;

const mysqlConfig = {
    host: '127.0.0.1',
    user: 'root',
    password: 'password',
};

const eventWatcher = MysqlEvents(
    mysqlConfig,
    { startAtEnd: true });


module.exports = {
    init: init,
    loadPolicy: loadPolicy,
    queryPolicy: queryPolicy,
    baseVerify: baseVerify,
    getRootHash: getRootHash
}

// 初始化Casbin
async function init() {
    const adapter = await SequelizeAdapter.newAdapter({
        dialect: 'mysql',
        host: '127.0.0.1',
        username: 'root',
        password: 'password',
        database: 'base1',
        tableName: 'policy',
        logging: false,
    });

    enforcer = await newEnforcer(pathModel, adapter);

    // 加载策略到MPT中
    await loadPolicy();
    console.log('Listening for policy changes in MySQL database...');
    // 监听数据库变化
    // const watcher = eventWatcher.add(
    //     'base1.policy.*',
    //     (oldRow, newRow, event) => {
    //         console.log(event);
    //         console.log(oldRow);
    //         console.log(newRow);
    //     },
    // );

    // eventEmitter.on('policyChanged', async () => {
    //     console.log('Detected policy changes in MySQL database. Rebuilding MPT...');
    //     enforcer = await newEnforcer(pathModel, adapter);
    //     await tree.clear();
    //     await tree.batch(enforcer.getModel().model.getPolicy(), (batch) => {
    //         enforcer.getModel().model.printPolicy();
    //         enforcer.getModel().model.getPolicy().forEach((policy) => {
    //             const p = `/${policy[0]}/${policy[1]}/${policy[2]}`;
    //             const value = '1';
    //             console.log(p, value);
    //             const hash = sha3(SqlString.escape(p.join(',')));
    //             batch.put(hash, value);
    //         });
    //     });
    //     const hash = await getRootHash();
    //     await attributes.setRootHash(hash);

    // });
}

// 加载ABAC策略
async function loadPolicy() {
    // 加载CSV文件中的策略
    await enforcer.loadPolicy();
    const policy = await enforcer.getPolicy();
    // 存储策略到MPT中
    for (let i = 0; i < policy.length; i++) {
        const [role, deviceName, operator, v3, v4, v5] = policy[i];
        const path = `/${role}/${deviceName}/${operator}`;
        const value = '1';
        console.log(path, value);
        await tree.put(Buffer.from(path), Buffer.from(value));
    }

    // 存储MPT的根哈希到链上
    const hash = await getRootHash();
    await attributes.setRootHash(hash);
    //console.log("attributes init over");
}

async function getPolicy() {
    return await enforcer.getPolicy();
}

// 查询策略
async function queryPolicy(role, deviceName, operator) {
    const path = `/${role}/${deviceName}/${operator}`;
    const value = await tree.get(Buffer.from(path));
    if (!value) {
        return null;
    }
    return value.toString().split(',');
}

//返回MPT的根哈希
async function getRootHash() {
    return tree.root.toString();
}

// 验证策略
// 1. 从MPT中查询策略
// 2. 调取链上的合约的hash
// 3. 比较两个hash
async function baseVerify(role, deviceName, operator) {
    if (! await queryPolicy(role, deviceName, operator)) {
        return false;
    }

    console.log("queryPolicy", await getPolicy());

    const hash = await getRootHash();
    const contractHash = await attributes.getRootHash();
    console.log("hash", Buffer.from(hash).toString('hex'));
    console.log("contractHash", Buffer.from(contractHash).toString('hex'));
    return hash == contractHash;
}



// 初始化Casbin并加载ABAC策略
async function TestAccessCtl() {
    await init();
    await loadPolicy(enforcer);
    if (await queryPolicy('root', 'TV', "read")) {
        console.log("allow");
    } else {
        console.log("deny");
    }
};



//TestAccessCtl();