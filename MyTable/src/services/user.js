import request from '@/utils/request';

export async function query() {
  return request('/api/users');
}
export async function queryCurrent() {
  return request('/api/currentUser');
}
export async function queryNotices() {
  return request('/api/notices');
}

export async function queryRoutes(){
  return request('/api/routes')
}

export async function changePassword(data){
  return request('/system/user/update',{
    method:'POST',
    data
  })
}