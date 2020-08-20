

const TestDetailModal = {
    namespace:"testDetailModal",
    state:{
        currentDetail:{},
        port:'',
        typeId:''
    },
    effects:{
        
    },
    reducers:{
        SaveUrlParmas(state,action){

            return {...state,port:action.payload.port,typeId:action.payload.typeId}
        }
    }
}

export default TestDetailModal