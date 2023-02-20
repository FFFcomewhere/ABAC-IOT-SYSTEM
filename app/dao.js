const mysql = require('mysql');
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: "password",
    database: "base1"
});

class User {
    constructor(username, password, readRole, writeRole) {
        this.username = username;
        this.password = password;
        this.readRole = readRole;
        this.writeRole = writeRole;
    }
}

class Device {
    constructor(name, state, power) {
        this.name = name;
        this.state = state;
        this.power = power;
    }
}


module.exports = {
    init: init,
    createUser: createUser,
    getUser: getUser,
    getUserList: getUserList,
    updateUser: updateUser,
    deleteUser: deleteUser,

    createDevice: createDevice,
    getDevice: getDevice,
    getDeviceList: getDeviceList,
    updateDevice: updateDevice,
    deleteDevice: deleteDevice,

    userTest: userTest,
    deviceTest: deviceTest
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
    const sql = `INSERT INTO user (username, password, readRole, writeRole) VALUES (?, ?, ?, ?)`;
    const value = [user.username, user.password, user.readRole, user.writeRole];
    connection.query(sql, value, (err, result) => {
        if (err) {
            console.error('Failed to insert user:', err);
            return;
        }
        console.log('Inserted user:', result);
    });
}

async function getUser(username) {
    const sql = `SELECT * FROM user WHERE username = ?`;
    const value = [username];

    try {
        const result = await new Promise((resolve, reject) => {
            connection.query(sql, value, (err, result) => {
                if (err) {
                    console.error('Failed to get user:', err);
                    reject(err);
                }
                console.log('Got user:', result);
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
                console.log('Got user:', result);
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
    const sql = `UPDATE user SET password = ?, readRole = ?, writeRole = ? WHERE username = ?`;
    const value = [user.password, user.readRole, user.writeRole, user.username];
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
        console.log('Delected user:', result);
    });
}

//device curd
function createDevice(device) {
    const sql = `INSERT INTO device (name, state, power) VALUES (?, ?, ?)`;
    const value = [device.name, device.state, device.power];
    connection.query(sql, value, (err, result) => {
        if (err) {
            console.error('Failed to create user:', err);
            return;
        }
        console.log('Createted user:', result);
    });
}

async function getDevice(name) {
    const sql = `SELECT * FROM device WHERE name = ?`;
    const value = [name];

    try {
        const result = await new Promise((resolve, reject) => {
            connection.query(sql, value, (err, result) => {
                if (err) {
                    console.error('Failed to get user:', err);
                    reject(err);
                }
                console.log('Got user:', result);
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
                    console.error('Failed to get user:', err);
                    reject(err);
                }
                console.log('Got user:', result);
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
            console.error('Failed to update user:', err);
            return;
        }
        console.log('Updated user:', result);
    });
}

function deleteDevice(name) {
    const sql = `DELETE FROM device WHERE name = ?`;
    const value = [name];
    connection.query(sql, value, (err, result) => {
        if (err) {
            console.error('Failed to Delete user:', err);
            return;
        }
        console.log('Deleted user:', result);
    });
}

async function userTest() {
    //创建用户
    let user1 = new User("user1", "password", "1", "1");
    createUser(user1);

    let user2 = new User("user2", "password", "1", "1");
    createUser(user2);

    //获取用户
    let getUser1 = await getUser("user1");
    console.log("getUser1 ", getUser1);

    let getUserLists = await getUserList();
    console.log("getUserList ", getUserLists);

    //更新用户
    getUser1[0].readRole = "0";
    updateUser(getUser1[0]);

    //删除用户
    deleteUser("user1");
}

async function deviceTest() {
    //创建设备
    let device1 = new Device("TV", "0", "100");
    createDevice(device1);

    //获取设备
    let getDevice1 = await getDevice("TV");
    console.log("getDevice1 ", getDevice1);

    //更新设备
    getDevice1[0].power = "50";
    updateDevice(getDevice1[0]);

    //删除设备
    deleteDevice("TV");
}

//userTest();
