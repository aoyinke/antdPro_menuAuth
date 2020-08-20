import request from '@/utils/request'


export  async function getEquipList (params){
    return request('/device/testing/page',{
        params
    })
}




export async function changeEquipInfo(params) {
    return request('/device/testing', {
        method: 'PUT',
        data: params,
    })
}


export async function getDictDetailAccroName(names) {
    return request('/system/dict/detail/list', {
        data: names,
        method: 'POST'
    })
}