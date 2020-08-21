import request from '@/utils/request'

export async function getUpgradeTest(params){
    return request('/testing/upgrade/page',{params})
}

export async function startToUpgradingTest(data){
    
    return request('/testing/upgrade',{
        data,
        method:"POST"
    })
}

export async function getDictDetailAccroName(names) {
    return request('/system/dict/detail/list', {
        data: names,
        method: 'POST'
    })
}