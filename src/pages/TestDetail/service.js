import request from '@/utils/request'

export function getTest(params){
    return request('/testing/testing',{
        method:"GET",
        params:params,
        timeout:3000
    })
}


export function startPrintTest(data){
    return request('/testing/testing',{
        method:"PUT",
        data:data
    })
}

export function startToTest(params){
    return request('/testing/testing',{
        method:"POST",
        data:params
    })
}

export function endTest(params){
    return request('/testing/testing',{
        method:"DELETE",
        data:params
    })
}

export function singleEndTest(params){
    return request('/testing/testing/end',{
        method:"DELETE",
        data:params
    })
}