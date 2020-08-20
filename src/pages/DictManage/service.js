import request from '@/utils/request'


export async function getDictListPage(params) {
    return request('/system/dict/page', {
        params: params
    })
}


export async function addDict(dictInfo) {
    return request('/system/dict', {
        data: dictInfo,
        method: 'POST'
    })
}

export async function deleteDict(ids) {
    return request('/system/dict', {
        data: ids,
        method: 'DELETE'
    })
}

export async function updateDict(ids) {
    return request('/system/dict', {
        data: ids,
        method: 'PUT'
    })
}

export async function getDictDetailAccroName(names) {
    return request('/system/dict/detail/list', {
        data: names,
        method: 'POST'
    })
}

export async function getDictDetailListPage(params) {
    return request(`/system/dict/detail/page/${params.name}`)
}

export async function addDictDetail(params) {
    return request('/system/dict/detail', {
        data: params,
        method: "POST"
    })
}

export async function deleteDictDetail(ids) {
    console.log("ids",ids)
    return request('/system/dict/detail', {
        data: ids,
        method: "DELETE"
    })
}

export async function changeDictDetail(info) {
    return request('/system/dict/detail', {
        data: info,
        method: "PUT"
    })
}