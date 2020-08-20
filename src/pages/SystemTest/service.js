import request from '@/utils/request';

export async function getSystemList() {
    return request('/device/type/list');
}
  