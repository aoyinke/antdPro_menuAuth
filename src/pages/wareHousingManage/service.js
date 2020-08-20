import request from '@/utils/request'



export async function getWareHouseList(params) {

    return request('/testing/stock/page',{
        params
    })
}

export async function moveIntoStock(data) {

    return request('/testing/stock',{
        method:"POST",
        data
    })
}


export async function removeFromStock(data) {

    return request('/testing/stock',{
        data,
        method:"DELETE",
    })
}
/**
 * 
 * @param {库存日志查询} params 
 */
export async function getWareHouseLogList(params) {

    return request('/testing/stock/list',{
        params
    })
}