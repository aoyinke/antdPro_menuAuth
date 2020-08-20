import request from '@/utils/request'

export function getMenu(){
    return request('/menu')
}