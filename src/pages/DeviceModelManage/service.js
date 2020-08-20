import request from '@/utils/request'

export  async function getModelListAll (params){
    return request(`/device/model/page/${params.typeId}`,{
        params:params
    })
}


export async function createtModel(params) {
    console.log("params",params)
    return request('/device/model', {
        method: 'POST',
        data: params,
    })
}

export async function deletetModel(ids) {
    return request('/device/model', {
        method: 'DELETE',
        data: ids,
    })
}

export async function changeModel(params) {
    return request('/device/model', {
        method: 'PUT',
        data: params,
    })
}


export async function getTypeIds() {
    return request('/device/type/list')
}