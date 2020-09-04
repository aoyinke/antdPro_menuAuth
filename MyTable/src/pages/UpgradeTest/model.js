const UpgradeTestModel =  {
    namespace: 'UpgradeTestModel',
    state: {
        detailModalVisible: false,
        uploadFileModalVisible:false
    },
    effects: {

    },
    reducers: {
        changeDetailModalVisible(state,action){
            return {...state,detailModalVisible:action.payload}
        },
        changeUploadFileModalVisible(state,action){
            return {...state,uploadFileModalVisible:action.payload}
        }
    }
}

export default UpgradeTestModel