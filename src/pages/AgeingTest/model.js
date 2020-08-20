const AgeingTestModel = {
    namespace: 'AgeingTestModel',
    state: {
      
        detailModalVisible:false,
        insideId:""
    },
    effects: {
        

    },
    reducers: {

        changeDetailModalVisible(state,action){
            return {...state,detailModalVisible:action.payload}
        },
        saveInsideId(state,action){
            return {...state,insideId:action.payload}
        }      
    }
}

export default AgeingTestModel