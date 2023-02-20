const dao = require('./dao');

function loginUp(username, password, readRole, writeRole) {
    const user = new User(username, password, readRole, writeRole);
    dao.createUser(user);
}

function login(username, password) {
    const user = dao.getUser(username);
    if (user.password === password) {
        return true;
    } else {
        return false;
    }
}

async function getUserInfo(username) {
    const user = await dao.getUser(username);
    return user;
}

async function getUserList() {
    const userList = await dao.getUserList();
    return userList;
}

function addDevice(name, state, power) {
    const device = new Device(name, state, power);
    dao.createDevice(device);
}

function delectDevice(name) {
    dao.deleteDevice(name);
}

function updateDevice(name, state) {
    let device = dao.getDevice(name);
    device.name = name;
    device.state = state;
    dao.updateDevice(device);
}

async function getDeviceInfo(name) {
    const device = await dao.getDevice(name);
    return device;
}

async function getDeviceList() {
    const deviceList = await dao.getDeviceList();
    return deviceList;
}


