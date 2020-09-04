import { EnumValueHandle } from '@/utils/utils'
import { message } from 'antd'
import { categoryCheck } from './service'


const OperateLogManageModel = {
    namespace: "OperateLogManageModel",
    state: {
        EnumValue: {}
    },
    effects: {

        *fetchEnumValue(_, { put, call }) {

            const response = yield call(categoryCheck)
            if (response.code === 200) {
                const types = EnumValueHandle(response.data)

                yield put({
                    type: "saveEnumValue",
                    payload: types
                })
            } else {
                message.error(`获取日志类别失败:${response.message || response.code}`)
            }
        }
    },
    reducers: {

        saveEnumValue(state, action) {

            return { ...state, EnumValue: action.payload || {} }
        }
    }
}


export default OperateLogManageModel