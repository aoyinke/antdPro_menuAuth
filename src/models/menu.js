import {getMenu} from '../services/menu'



const MenuModel = {
    namespace:"menuModel",
    state:{
        menuDataList:{}
    },
    effects:{
        *fetchMenuData(_,{call,put}){
            const res = yield call(getMenu)
            // const response = formatter(res)
            yield put({
                type:'saveMenu',
                payload:res
            })
        }
    },
    reducers:{
        saveMenu(state,action){
            return { ...state, menuDataList: action.payload}
        }
    }
}

export default MenuModel