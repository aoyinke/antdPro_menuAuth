import { message } from 'antd';
import {
  getDictDetailListPage,
  changeDictDetail,
  addDictDetail,
  deleteDictDetail,
  getDictListPage,
  deleteDict,
  addDict,
  updateDict,
} from './service';

const DictModel = {
  namespace: 'DictModel',
  state: {
    dictList: [],
    dictDetailList: [],
  },

  effects: {
    *fetchGetDictListPage({ payload }, { put, call }) {
      const response = yield call(getDictListPage, payload);
      yield put({
        type: 'saveDictList',
        payload: response,
      });
    },

    *fetchDeleteDict({ payload }, { put, call }) {
      const response = yield call(deleteDict, payload);
      if (response.code === 200) {
        message.info('删除成功');
      } else {
        message.error(`删除失败，原因：${response.message}`);
      }
      yield put({
        type: 'GlobalModel/changeDeleteModalVisible',
        payload: false,
      });
    },

    *fetchAddDict({ payload }, { put, call }) {
      yield call(addDict, payload);

      yield put({
        type: 'GlobalModel/changeCreateModalVisible',
        payload: false,
      });
    },

    *fetchUpdateDict({ payload }, { put, call }) {
      const response = yield call(updateDict, payload);
      if (response.code === 200) {
        message.info('修改成功');
      } else {
        message.error(`修改失败，原因：${response.message}`);
      }
      yield put({
        type: 'GlobalModel/changeModifyModalVisible',
        payload: false,
      });
    },

    *fetchGetDictDetailListPage({ payload }, { put, call }) {
      const response = yield call(getDictDetailListPage, payload);
      yield put({
        type: 'saveDictDetailList',
        payload: response,
      });
    },

    *fetchDeleteDetailDict({ payload }, { put, call }) {
      yield call(deleteDictDetail, payload.ids);

      yield put({
        type: 'GlobalModel/changeDeleteDetailModalVisible',
        payload: false,
      });
    },

    *fetchAddDetailDict({ payload }, { put, call }) {
      const response = yield call(addDictDetail, payload);
      if (response.code !== 200) {
        message.error(`("添加字典详情错误，：${response.message}`);
      } else {
        message.info('添加字典详情成功');
      }
      yield put({
        type: 'GlobalModel/changeCreateDetailModalVisible',
        payload: false,
      });
    },

    *fetchUpdateDetailDict({ payload }, { put, call }) {
      const res = yield call(changeDictDetail, payload);
      if (res.code !== 200) {
        message.error(`("修改字典详情错误，：${res.message}`);
      } else {
        message.info('修改字典详情成功');
      }
      yield put({
        type: 'GlobalModel/changeModifyDetailModalVisible',
        payload: false,
      });
    },
  },

  reducers: {
    saveDictList(state, action) {
      return { ...state, dictList: action.payload.data.rows || [] };
    },
    saveDictDetailList(state, action) {
      return { ...state, dictDetailList: action.payload.data.rows || [] };
    },
  },
};

export default DictModel;
