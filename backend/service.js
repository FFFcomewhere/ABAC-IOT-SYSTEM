const dao = require('./dao');
const accessCtl = require('./accessCtl');
const attributes = require('./attributes');
const auth = require('./auth');

module.exports = {
    init: init,

    register: register,
    login: login,
    getUserInfo: getUserInfo,
    getUserList: getUserList,

    addDevice: addDevice,
    deleteDevice: deleteDevice,
    updateDevice: updateDevice,
    getDeviceInfo: getDeviceInfo,
    getDeviceList: getDeviceList,

    addPolicy: addPolicy,
    deletePolicy: deletePolicy,
    getPolicyInfo: getPolicyInfo,
    getPolicyList: getPolicyList
}

async function init() {
    await dao.init();
    await attributes.init();
    await accessCtl.init();
}

function register(username, password, confirmPassword, role) {
    if (password != confirmPassword) {
        return;
    }
    const user = new dao.User(username, password, role);
    dao.createUser(user);
}

async function login(username, password) {
    const user = await dao.getUserInfo(username);
    if (user.length == 0) {
        return null;
    }
    if (user[0].password == password) {
        const token = auth.generateToken(user[0].username, user[0].role);
        return token;
    }
}

async function getUserInfo(username) {
    const user = await dao.getUserInfo(username);
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

function addPolicy(role, deviceName, operation) {
    const policy = new dao.Policy(role, deviceName, operation);
    dao.createPolicy(policy);
}

function deletePolicy(role, deviceName) {
    dao.deletePolicy(role, deviceName);
}

async function getPolicyInfo(role, deviceName) {
    const policy = await dao.getPolicyInfo(role, deviceName);
    return policy;
}

async function getPolicyList() {
    const policyList = await dao.getPolicyList();
    return policyList;
}





