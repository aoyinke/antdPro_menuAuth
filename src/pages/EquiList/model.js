import { message } from 'antd'
import { getDictDetailAccroName } from './service'


const EquipListModel = {
    namespace: 'EquipListModel',
    state: {
        equipValueEnum: {}

    },
    effects: {
        *fetchPrepareEnumValue(_, { put, call }) {
            const res = {}
            const response = yield call(getDictDetailAccroName, ['equipState'])
            if (response.code === 200) {
                const { equipState } = response.data
                equipState.forEach(equipItem => {
                    const equipValue = equipItem.value
                    res[equipValue] = { text: equipItem.laber }
                })
            } else {
                message.error(`出错了，${response.message}`)
            }
            yield put({
                type: "saveEquipValueEnum",
                payload: res
            })
        }

    },
    reducers: {
        saveEquipValueEnum(state, action) {

            return { ...state, equipValueEnum: action.payload || {} }
        }

    }
}

export default EquipListModel