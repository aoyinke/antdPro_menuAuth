const GlobalModel = {
    namespace: "GlobalModel",
    state: {
        createModalVisible: false,
        modifyModalVisible: false,
        deleteModalVisible:false,
        currentModifyRole: {},
        currentRowData: {}
    },
    effects: {

    },
    reducers: {
        changeCreateModalVisible(state, action) {

            return { ...state, createModalVisible: action.payload }
        },
        changeModifyModalVisible(state, action) {


            return { ...state, modifyModalVisible: action.payload }
        },
        changeDeleteModalVisible(state, action) {


            return { ...state, deleteModalVisible: action.payload }
        },
        saveCurrentModifyRole(state, action) {
            return { ...state, currentModifyRole: action.payload || {}}
        },
        saveCurrentRowData(state, action) {

            return { ...state, currentRowData: action.payload }
        },

    }
}

export default GlobalModel