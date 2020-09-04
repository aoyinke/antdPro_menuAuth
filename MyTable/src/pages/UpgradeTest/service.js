import request from '@/utils/request'

export async function getUpgradeTest(params) {
    // return request('/testing/upgrade/page',{params})
    return request('/api/upgrade')
}

export async function startToUpgradingTest(data) {

    return request('/testing/upgrade', {
        data,
        method: "POST"
    })
}

export async function getDictDetailAccroName(names) {
    return request('/system/dict/detail/list', {
        data: names,
        method: 'POST'
    })
}

export async function getUpgradeList() {
    return request(`/api/upgradeDetail`)
}

export async function uploadUpgradeFile(params) {
    const { version, ...data } = params
    return request(`/testing/upgrade/${version}`, {
        method: 'PUT',
        body: data.file,

    })
}