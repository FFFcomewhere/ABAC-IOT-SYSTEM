const mysql = require('mysql');
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: "password",
    database: "base1"
});

class User {
    constructor(username, password, role) {
        this.username = username;
        this.password = password;
        this.role = role;
    }
}

class Device {
    constructor(name, state, power) {
        this.name = name;
        this.state = state;
        this.power = power;
    }
}

class Policy {
    constructor(v0, v1, v2) {
        this.v0 = v0;
        this.v1 = v1;
        this.v2 = v2;
    }
}


module.exports = {
    connection: connection,

    User: User,
    Device: Device,
    Policy: Policy,

    init: init,

    createUser: createUser,
    getUserInfo: getUserInfo,
    getUserList: getUserList,
    updateUser: updateUser,
    deleteUser: deleteUser,

    createDevice: createDevice,
    getDeviceInfo: getDeviceInfo,
    getDeviceList: getDeviceList,
    updateDevice: updateDevice,
    deleteDevice: deleteDevice,

    createPolicy: createPolicy,
    deletePolicy: deletePolicy,
    getPolicyInfo: getPolicyInfo,
    getPolicyList: getPolicyList,

    userTest: userTest,
    deviceTest: deviceTest,
    policyTest: policyTest
}

async function init() {
    connection.connect((err) => {
        if (err) {
            console.error('Failed to connect to MySQL database:', err);
            return;
        }
        console.log('Connected to MySQL database.');
    });
}

//user curd
function createUser(user) {
    const sql = `INSERT INTO user (username, password, role) VALUES (?, ?, ?)`;
    const value = [user.username, user.password, user.role];
    connection.query(sql, value, (err, result) => {
        if (err) {
            console.error('Failed to insert user:', err);
            return;
        }
    });
}

async function getUserInfo(username) {
    const sql = `SELECT * FROM user WHERE username = ?`;
    const value = [username];

    try {
        const result = await new Promise((resolve, reject) => {
            connection.query(sql, value, (err, result) => {
                if (err) {
                    console.error('Failed to get user:', err);
                    reject(err);
                }
                resolve(result);
            });
        });
        return result;
    } catch (error) {
        console.log("error ", error);
        return null;
    }
}

async function getUserList() {
    const sql = `SELECT * FROM user`;
    const value = [];

    try {
        const result = await new Promise((resolve, reject) => {
            connection.query(sql, value, (err, result) => {
                if (err) {
                    console.error('Failed to get user:', err);
                    reject(err);
                }
                resolve(result);
            });
        });
        return result;
    } catch (error) {
        console.log("error ", error);
        return null;
    }
}

function updateUser(user) {
    const sql = `UPDATE user SET password = ?, role = ? WHERE username = ?`;
    const value = [user.password, user.role, user.username];
    connection.query(sql, value, (err, result) => {
        if (err) {
            console.error('Failed to update user:', err);
            return;
        }
        console.log('Updated user:', result);
    });
}

function deleteUser(username) {
    const sql = `DELETE FROM user WHERE username = ?`;
    const value = [username];

    connection.query(sql, value, (err, result) => {
        if (err) {
            console.error('Failed to delect user:', err);
            return;
        }
    });
}

//device curd
function createDevice(device) {
    const sql = `INSERT INTO device (name, state, power) VALUES (?, ?, ?)`;
    const value = [device.name, device.state, device.power];
    connection.query(sql, value, (err, result) => {
        if (err) {
            console.error('Failed to create device:', err);
            return;
        }
    });
}

async function getDeviceInfo(name) {
    const sql = `SELECT * FROM device WHERE name = ?`;
    const value = [name];

    try {
        const result = await new Promise((resolve, reject) => {
            connection.query(sql, value, (err, result) => {
                if (err) {
                    console.error('Failed to get device:', err);
                    reject(err);
                }
                resolve(result);
            });
        });
        return result;
    } catch (error) {
        console.log("error ", error);
        return null;
    }
}

async function getDeviceList() {
    const sql = `SELECT * FROM device`;
    const value = [];
    try {
        const result = await new Promise((resolve, reject) => {
            connection.query(sql, value, (err, result) => {
                if (err) {
                    console.error('Failed to get device:', err);
                    reject(err);
                }
                resolve(result);
            });
        });
        return result;
    } catch (error) {
        console.log("error ", error);
        return null;
    }
}

function updateDevice(device) {
    const sql = `UPDATE device SET state = ?, power = ? WHERE name = ?`;
    const value = [device.state, device.power, device.name];

    connection.query(sql, value, (err, result) => {
        if (err) {
            console.error('Failed to update device:', err);
            return;
        }
    });
}

function deleteDevice(name) {
    const sql = `DELETE FROM device WHERE name = ?`;
    const value = [name];
    connection.query(sql, value, (err, result) => {
        if (err) {
            console.error('Failed to Delete device:', err);
            return;
        }
    });
}

//Policy curd v0=role v1=deviceName v2=operator
function createPolicy(policy) {
    const sql = `INSERT INTO policy (ptype, v0, v1, v2) VALUES (?, ?, ?, ?)`;
    const value = ["p", policy.v0, policy.v1, policy.v2];
    connection.query(sql, value, (err, result) => {
        if (err) {
            console.error('Failed to create policy:', err);
            return;
        }
    });
}

async function getPolicyInfo(v0, v1) {
    const sql = `SELECT * FROM policy WHERE v0 = ? && v1 = ?`;
    const value = [v0, v1];
    try {
        const result = await new Promise((resolve, reject) => {
            connection.query(sql, value, (err, result) => {
                if (err) {
                    console.error('Failed to get policy:', err);
                    reject(err);
                }
                resolve(result);
            });
        });
        return result;
    } catch (error) {
        console.log("error ", error);
        return null;
    }
}

async function getPolicyList() {
    const sql = `SELECT * FROM policy`;
    const value = [];
    try {
        const result = await new Promise((resolve, reject) => {
            connection.query(sql, value, (err, result) => {
                if (err) {
                    console.error('Failed to get policy:', err);
                    reject(err);
                }
                resolve(result);
            });
        });
        return result;
    } catch (error) {
        console.log("error ", error);
        return null;
    }
}

function deletePolicy(policy) {
    const sql = `DELETE FROM policy WHERE v0 = ? && v1 = ? && v2 = ?`;
    const value = [policy.v0, policy.v1, policy.v2];
    connection.query(sql, value, (err, result) => {
        if (err) {
            console.error('Failed to Delete user:', err);
            return;
        }
    });
}


async function userTest() {
    //创建用户
    let user1 = new User("user1", "password", "1", "1");
    createUser(user1);

    let user2 = new User("user2", "password", "1", "1");
    createUser(user2);

    //获取用户
    let getUser1 = await getUserInfo("user1");
    console.log("getUser1 ", getUser1);

    let getUserLists = await getUserList();
    console.log("getUserList ", getUserLists);

    //更新用户
    getUser1[0].readRole = "0";
    updateUser(getUser1[0]);

    // //删除用户
    // deleteUser("user1");
}

async function deviceTest() {
    //创建设备
    let device1 = new Device("TV", "0", "100");
    createDevice(device1);

    //获取设备
    let getDevice1 = await getDeviceInfo("TV");
    console.log("getDevice1 ", getDevice1);

    //更新设备
    getDevice1[0].power = "50";
    updateDevice(getDevice1[0]);

    // //删除设备
    // deleteDevice("TV");
}

async function policyTest() {
    //创建策略
    let policy1 = new Policy("root", "TV", "write");
    createPolicy(policy1);

    //获取策略
    let getPolicy1 = await getPolicyInfo("root", "TV");
    console.log("getPolicy1 ", getPolicy1);


    //删除策略
    //deletePolicy("root", "TV", "write");
}

// userTest();
// deviceTest();
// policyTest();
