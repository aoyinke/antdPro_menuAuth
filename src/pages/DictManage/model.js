import {
    getDictDetailAccroName,
    getDictDetailListPage,
    changeDictDetail,
    addDictDetail,
    deleteDictDetail,
    getDictListPage,
    deleteDict,
    addDict,
    updateDict
} from './service'
import { message } from 'antd'

const DictModel = {
    namespace: "DictModel",
    state: {
        dictList: [],
        dictDetailList: [],
        createDetailModalVisible: false,
        deleteDetailModalVisible: false
    },
    effects: {
        *fetchgetDictListPage({ payload }, { put, call }) {
            const response = yield call(getDictListPage, payload)
            yield put({
                type: "saveDictList",
                payload: response
            })
        },
        *fetchdeleteDict({ payload }, { call }) {
            yield call(deleteDict, payload)


        },
        *fetchaddDict({ payload }, { put, call }) {
            yield call(addDict, payload)

            yield put({
                type: "GlobalModel/changeCreateModalVisible",
                payload: false
            })

        },
        *fetchupdateDict({ payload }, { put, call }) {
            yield call(updateDict, payload)
            yield put({
                type: "fetchgetDictListPage"
            })
        },

        *fetchgetDictDetailListPage({ payload }, { put, call }) {
            // console.log("payload",payload)
            const response = yield call(getDictDetailListPage, payload)
            yield put({
                type: "saveDictDetailList",
                payload: response
            })
        },

        *fetchdeleteDetailDict({ payload }, { put, call }) {
            yield call(deleteDictDetail, payload.id)
            yield put({
                type: "fetchgetDictDetailListPage",
                payload: { name: payload.dictName }
            })

        },
        *fetchaddDetailDict({ payload }, { put, call }) {
            const response = yield call(addDictDetail, payload)
            if (response.code !== 200) {

                message.error(`("添加字典详情错误，：${response.message}`)
                return


            }

            yield put({
                type: "fetchgetDictDetailListPage",
                payload: { name: payload.dictName }
            })
            yield put({
                type: "changeCreateDetailModalVisible",
                payload: false
            })

        },
        *fetchupdateDetailDict({ payload }, { put, call }) {
            yield call(changeDictDetail, payload)

        }
    },
    reducers: {
        saveDictList(state, action) {
            return { ...state, dictList: action.payload.data.rows || {} }
        },
        saveDictDetailList(state, action) {
            return { ...state, dictDetailList: action.payload.data.rows || {} }
        },
        changeCreateDetailModalVisible(state, action) {

            return { ...state, createDetailModalVisible: action.payload }
        },
        changeDeleteDetailModalVisible(state, action) {

            return { ...state, deleteDetailModalVisible: action.payload }
        }
    }
}

export default DictModel