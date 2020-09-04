import { message } from 'antd'
import { getDictDetailAccroName } from './service'


const EquipListModel = {
    namespace: 'EquipListModel',
    state: {
        equipValueEnum: {},
        changeStateModalVisible: false,
        confirmDestoryFirstModalVisible:false,
        confirmDestorySecondModalVisible:false

    },
    effects: {
        *fetchPrepareEnumValue(_, { put, call }) {
            const res = {}

            const errArr = ["1", "4", "7", "10", "-2"]
            const succArr = ["5", "8", "9","11"]
            const proArr = ["0","3","6","-1"]
            const response = yield call(getDictDetailAccroName, ['equipState'])
            if (response.code === 200) {
                const { equipState } = response.data
                equipState.forEach(equipItem => {
                    const equipValue = equipItem.value
                    if (errArr.indexOf(equipValue) !== -1) {
                        res[equipValue] = { text: equipItem.laber, status: 'Error' }
                    } else if (succArr.indexOf(equipValue) !== -1) {
                        res[equipValue] = { text: equipItem.laber, status: 'Success' }
                    } else if (proArr.indexOf(equipValue) !== -1){
                        res[equipValue] = { text: equipItem.laber, status: 'Processing' }
                    }else{
                        res[equipValue] = { text: equipItem.laber, status: 'Waiting' }

                    }


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
        },
        changeStateModalVisible(state, action) {
            return { ...state, changeStateModalVisible: action.payload }
        },
        changeConfirmDestoryFirstModalVisible(state, action) {
            return { ...state, confirmDestoryFirstModalVisible: action.payload }
        },
        changeConfirmDestorySecondModalVisible(state, action) {
            return { ...state, confirmDestorySecondModalVisible: action.payload }
        },

    }
}

export default EquipListModel