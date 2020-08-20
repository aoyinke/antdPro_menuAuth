import { queryCurrent, query as queryUsers, changePassword } from '@/services/user';
import { getUser,  loginOut } from '@/utils/utils';
import { history } from 'umi';
import { message } from 'antd';

const UserModel = {
  namespace: 'user',
  state: {
    currentUser: {},
    showChangePassword: false
  },
  effects: {
    *fetch(_, { call, put}) {
      const response = yield call(queryUsers);
      yield put({
        type: 'save',
        payload: response,
      });
    },

    *fetchCurrent(_, { call, put }) {
      const response = yield call(queryCurrent);
      yield put({
        type: 'saveCurrentUser',
        payload: response,
      });
    },
    *fetchChangePassword({ payload }, { call }) {
      const response = yield call(changePassword, payload);
      if (response.code === 200) {
        message.info("修改密码成功")
        loginOut()
        history.push('/')
      } else if (response.message) {
        message.error(`修改密码错误：${response.message}`)
      }
    },
  },
  reducers: {
    saveCurrentUser(state) {
      let res = getUser()
      if (res) {
        res = JSON.parse(res)
        // return { ...state, currentUser: action.payload || {} };
        return { ...state, currentUser: res }
      }
      return {}
    },
    changeShowChangePassword(state, action) {

      return { ...state, showChangePassword: action.payload }
    },
    changeNotifyCount(
      state = {
        currentUser: {},
      },
      action,
    ) {
      return {
        ...state,
        currentUser: {
          ...state.currentUser,
          notifyCount: action.payload.totalCount,
          unreadCount: action.payload.unreadCount,
        },
      };
    },
  },
};
export default UserModel;
