import {getSystemList} from './service'

const SystemList = {
    namespace:"systemList",
    state:{
        currentSystemList:[]
    },
    effects:{
        *fetchCurrent(_,{call,put}){
            const response = yield call(getSystemList)
            if(response.code !== 200) return 
            yield put({
                type:'saveCurrentSystemList',
                payload:response
            })
        }
    },
    reducers:{
        saveCurrentSystemList(state,action){
            return {...state,currentSystemList:action.payload.data || {}}
        }
    }
}

export default SystemList 