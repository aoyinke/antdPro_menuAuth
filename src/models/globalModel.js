const GlobalModel = {
  namespace: 'GlobalModel',
  state: {
    createModalVisible: false,
    createDetailModalVisible: false,
    modifyModalVisible: false,
    modifyDetailModalVisible: false,
    deleteModalVisible: false,
    deleteDetailModalVisible: false,
    currentModifyRole: {},
    currentRowData: {},
  },
  effects: {},
  reducers: {
    changeCreateModalVisible(state, action) {
      return { ...state, createModalVisible: action.payload };
    },

    changeCreateDetailModalVisible(state, action) {
      return { ...state, createDetailModalVisible: action.payload };
    },

    changeModifyModalVisible(state, action) {
      return { ...state, modifyModalVisible: action.payload };
    },

    changeModifyDetailModalVisible(state, action) {
      return { ...state, modifyDetailModalVisible: action.payload };
    },

    changeDeleteModalVisible(state, action) {
      return { ...state, deleteModalVisible: action.payload };
    },

    changeDeleteDetailModalVisible(state, action) {
      return { ...state, deleteDetailModalVisible: action.payload };
    },

    saveCurrentModifyRole(state, action) {
      return { ...state, currentModifyRole: action.payload || {} };
    },

    saveCurrentRowData(state, action) {
      return { ...state, currentRowData: action.payload };
    },
  },
};

export default GlobalModel;
