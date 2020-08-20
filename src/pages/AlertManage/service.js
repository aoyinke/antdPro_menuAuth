import request from '@/utils/request'

export  async function getAlertListAll (params){
    return request(`/device/alarmType/list/${params.typeId}`,{
        params:params
    })
}


export  async function getAlertList (params){
    return request(`/device/alarmType/page/${params.typeId}`,{
        params:params
    })
}

export async function createAlert(params) {
    console.log("params",params)
    return request('/device/alarmType', {
        method: 'POST',
        data: params,
    })
}

export async function deleteAlert(ids) {
    return request('/device/alarmType', {
        method: 'DELETE',
        data: ids,
    })
}

export async function changeAlert(params) {
    return request('/device/alarmType', {
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