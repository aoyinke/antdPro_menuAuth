import request from '@/utils/request'


export async function getAgeingTest(params) {

    return request('/testing/olding/page',{
        params
    })
}

export async function startToAgeingTest(data){
    
    return request('/testing/olding',{
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

export  async function getAgeingList (params){
    return request(`/testing/olding/list`,{
        params
    })
}