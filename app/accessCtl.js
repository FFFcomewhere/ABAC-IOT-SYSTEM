const pathModel = "./config/model.conf";


const level = require('level');
const leveldown = require('leveldown');
const levelup = require('levelup');
const { BaseTrie } = require('merkle-patricia-tree');
const { SequelizeAdapter } = require('casbin-sequelize-adapter');
const { newEnforcer } = require('casbin');

// 初始化LevelDB数据库
const db = levelup(leveldown('./levelDB'));

// 创建MPT
const trie = new BaseTrie(db);

// 初始化Casbin
async function initCasbin() {
    const adapter = await SequelizeAdapter.newAdapter({
        dialect: 'mysql',
        host: 'localhost',
        username: 'root',
        password: 'password',
        database: 'base1',
        tableName: 'policy',
        logging: false,
    });
    const enforcer = await newEnforcer(pathModel, adapter);
    return enforcer;
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
        await trie.put(Buffer.from(path), Buffer.from(value));
    }
}

// 查询策略
async function queryPolicy(role, deviceName, operator) {
    const path = `/${role}/${deviceName}/${operator}`;
    const value = await trie.get(Buffer.from(path));
    if (!value) {
        return null;
    }
    return value.toString().split(',');
}

// 初始化Casbin并加载ABAC策略
(async function () {
    const enforcer = await initCasbin();
    await loadPolicy(enforcer);
    if (await queryPolicy('root', 'router', "write")) {
        console.log("allow");
    }

})();

