const dao = require('./dao');

module.exports = {
    loginUp: loginUp,
    login: login,
    getUserInfo: getUserInfo,
    getUserList: getUserList,

    addDevice: addDevice,
    deleteDevice: deleteDevice,
    updateDevice: updateDevice,
    getDeviceInfo: getDeviceInfo,
    getDeviceList: getDeviceList
}

function loginUp(username, password, readRole, writeRole) {
    const user = new dao.User(username, password, readRole, writeRole);
    dao.createUser(user);
}

async function login(username, password) {
    const user = await dao.getUserInfo(username);
    if (user[0].password == password) {
        return true;
    } else {
        return false;
    }
}

async function getUserInfo(username) {
    const user = await dao.getUserInfo(username);
    console.log("user", user);
    return user;
}

async function getUserList() {
    const userList = await dao.getUserList();
    return userList;
}

function addDevice(name, state, power) {
    const device = new dao.Device(name, state, power);
    dao.createDevice(device);
}

function deleteDevice(name) {
    dao.deleteDevice(name);
}

function updateDevice(name, state) {
    let device = dao.getDeviceInfo(name);
    device.name = name;
    device.state = state;
    dao.updateDevice(device);
}

async function getDeviceInfo(name) {
    const device = await dao.getDeviceInfo(name);
    return device;
}

async function getDeviceList() {
    const deviceList = await dao.getDeviceList();
    return deviceList;
}


