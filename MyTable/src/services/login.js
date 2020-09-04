import request from '@/utils/request';
import {Base64} from 'js-base64'

export async function fakeAccountLogin(params) {
  let par = Object.assign(params,{acco:Base64.encode(params.acco),steg:Base64.encode(params.steg)})
  par.token="666"
  return request('/system/auth/login', {
    method: 'POST',
    data: params,
  });
}
export async function getFakeCaptcha(mobile) {
  return request(`/api/login/captcha?mobile=${mobile}`);
}

export async function unLogin(){
  return request('/system/auth/logout',{
    method:'DELETE'
  })
}

