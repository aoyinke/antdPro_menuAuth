import request from '@/utils/request'


export  async function getEquipList (params){
    console.log("params",params)
    return request('/device/type/page',{
        params:params
    })
}

export async function createEquip(params) {
    return request('/device/type', {
        method: 'POST',
        data: params,
    })
}

export async function getAllEquip() {
    return request('/device/type/list')
}

export async function changeEquip(params) {
    return request('/device/type', {
        method: 'PUT',
        data: params,
    })
}