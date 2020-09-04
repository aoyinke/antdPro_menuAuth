import { stringify } from 'querystring';
import { history } from 'umi';
import { fakeAccountLogin,unLogin } from '@/services/login';
import { setAuthority } from '@/utils/authority';
import { getPageQuery,setToken,loginOut,setUser } from '@/utils/utils';

const Model = {
  namespace: 'login',
  state: {
    code: undefined,
  },
  effects: {
    *login({ payload }, { call, put }) {
      const response = yield call(fakeAccountLogin, payload);
      yield put({
        type: 'changeLoginStatus',
        payload: response,
      }); // Login successfully

      if (response.code === 200) {
        const urlParams = new URL(window.location.href);
        const params = getPageQuery();
        let { redirect } = params;

        if (redirect) {
          const redirectUrlParams = new URL(redirect);

          if (redirectUrlParams.origin === urlParams.origin) {
            redirect = redirect.substr(urlParams.origin.length);

            if (redirect.match(/^\/.*#/)) {
              redirect = redirect.substr(redirect.indexOf('#') + 1);
            }
          } else {
            window.location.href = '/welcome';
            return;
          }
        }

        history.replace(redirect || '/welcome');
      }
    },

    *logout(_, { call }) {
      const { redirect } = getPageQuery(); // Note: There may be security issues, please note

      if (window.location.pathname !== '/user/login' && !redirect) {
        history.replace({
          pathname: '/user/login',
          search: stringify({
            redirect: window.location.href,
          }),
        });
        loginOut()
        
      }
      yield call(unLogin)
      
    },
  },
  reducers: {
    changeLoginStatus(state, { payload }) {
      if(payload.code === 200){
        setAuthority(payload.data.user.roleEuName);
        setToken(payload.data.token)
        setUser(payload.data.user)
      }
      return {...state,code: payload.code};
      
    },
  },
};
export default Model;
