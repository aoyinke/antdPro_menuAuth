import request from '@/utils/request'


export  async function getCharList (params){
    return request('/system/role/page',{
        params:params
    })
}

export async function createRole(params) {
    return request('/system/role', {
        method: 'POST',
        data: params,
    })
}

export async function deleteRole(ids) {
    return request('/system/role', {
        method: 'DELETE',
        data: ids,
    })
}

export async function changeRoleInfo(params) {
    return request('/system/role', {
        method: 'PUT',
        data: params,
    })
}


export async function changeMenu(data) {
    return request('/menu',{
        method:"POST",
        data
    })
}


export async function getMenuList(){
    return request('/menu')
}