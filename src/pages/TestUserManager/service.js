import request from '@/utils/request'


export async function getUserList(params) {
    console.log("params",params)
    return request('/system/user/page',{
        params :params
    })
}

export async function changeUserInfo(entity) {
    console.log("entity",entity)
    return request('/system/user', {
        method: 'PUT',
        data: entity,
    })
}

export async function createUserInfo(userInfo) {
    return request('/system/user', {
        method: 'POST',
        data: userInfo,
    })
}

export async function deleteUserInfo(ids) {
    return request('/system/user', {
        method: 'DELETE',
        data: ids,
    })
}

export async function resetPassword(params) {
    let {token} = params
    return request(`/system/user/reset/${params.id}`, {
        method: 'POST',
        data: {token},
    })
}

export async function getDictDetailAccroName(names) {
    return request('/system/dict/detail/list', {
        data: names,
        method: 'POST'
    })
}

export async function getAllRole(){
    return request('/system/role/page')
}