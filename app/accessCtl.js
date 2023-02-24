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
const mysqlEvents = require('mysql-events');

const attributes = require('./attributes');

// 初始化LevelDB数据库
const db = levelup(leveldown('./levelDB'));
const tree = new BaseTrie(db); // 初始化MPT

let enforcer;
let policyWatcher;

const eventEmitter = new EventEmitter();

const mysqlConfig = {
    host: 'localhost',
    user: 'root',
    password: 'password',
};

const watchPolicyChanges = async () => {
    const watcher = mysqlEvents(mysqlConfig);
    policyWatcher = watcher.add(
        'base1.policy',
        (oldRow, newRow, event) => {
            eventEmitter.emit('policyChanged');
        },
    );
};

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
        host: 'localhost',
        username: 'root',
        password: 'password',
        database: 'base1',
        tableName: 'policy',
        logging: false,
    });

    enforcer = await newEnforcer(pathModel, adapter);

    // 加载策略到MPT中
    await loadPolicy(enforcer);
    console.log('Listening for policy changes in MySQL database...');

    await watchPolicyChanges();
    eventEmitter.on('policyChanged', async () => {
        console.log('Detected policy changes in MySQL database. Rebuilding MPT...');
        enforcer = await newEnforcer(pathModel, adapter);
        await tree.clear();
        await tree.batch(enforcer.getModel().model.getPolicy(), (batch) => {
            enforcer.getModel().model.printPolicy();
            enforcer.getModel().model.getPolicy().forEach((policy) => {
                const p = `/${policy[0]}/${policy[1]}/${policy[2]}`;
                const value = '1';
                console.log(p, value);
                const hash = sha3(SqlString.escape(p.join(',')));
                batch.put(hash, value);
            });
        });
        const hash = await getRootHash();
        await attributes.setRootHash(hash);

    });
}

// 加载ABAC策略
async function loadPolicy(enforcer) {
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

    const hash = await getRootHash();
    const contractHash = await attributes.getRootHash();
    console.log("hash", hash);
    console.log("contractHash", contractHash);
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



TestAccessCtl();
//queryPolicy('root', 'TV', "read");