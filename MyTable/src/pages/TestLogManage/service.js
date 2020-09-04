import request from '@/utils/request'

export async function getTestLogList(params){
    return request('/logging/testing/page',{
        params:params
    })
}

export async function categoryCheck(){
    return request('/logging/testing/list')
}