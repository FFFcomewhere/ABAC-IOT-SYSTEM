import policy from './request'

// 添加策略
const addPolicyApi = data => {
    return policy.post({
        url: '/addPolicy',
        data
    })
}

const deletePolicyApi = data => {
    return policy.post({
        url: '/deletePolicy',
        data
    })
}

const updatePolicyApi = data => {
    return policy.post({
        url: '/updatePolicy',
        data
    })
}

const getPolicyInfoApi = data => {
    return policy.post({
        url: '/getPolicyInfo',
        data
    })
}

const getPolicyListApi = data => {
    return policy.get({
        url: '/getPolicyList',
        data
    })
}

export default {
    addPolicyApi,
    deletePolicyApi,
    updatePolicyApi,
    getPolicyInfoApi,
    getPolicyListApi
}