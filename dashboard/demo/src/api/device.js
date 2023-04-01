import device from './request'

// 添加设备
const addDeviceApi = data => {
    return device.post({
        url: '/addDevice',
        data
    })
}

const deleteDeviceApi = data => {
    return device.post({
        url: '/deleteDevice',
        data
    })
}

const updateDeviceApi = data => {
    return device.post({
        url: '/updateDevice',
        data
    })
}

const getDeviceInfoApi = data => {
    return device.post({
        url: '/getDeviceInfo',
        data
    })
}

const getDeviceListApi = data => {
    return device.get({
        url: '/getDeviceList',
        data
    })
}

export default {
    addDeviceApi,
    deleteDeviceApi,
    updateDeviceApi,
    getDeviceInfoApi,
    getDeviceListApi
}