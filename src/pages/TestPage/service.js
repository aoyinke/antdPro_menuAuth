import request from '@/utils/request'

export async function getOperateLogList(params){
    return request('/logging/operation/page',{
        params:params
    })
}

export async function categoryCheck(){
    return request('/logging/operation/list')
}