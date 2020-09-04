const AgeingTestModel = {
    namespace: 'AgeingTestModel',
    state: {

        detailModalVisible: false,
    },
    effects: {


    },
    reducers: {

        changeDetailModalVisible(state, action) {
            return { ...state, detailModalVisible: action.payload }
        }
    }
}

export default AgeingTestModel