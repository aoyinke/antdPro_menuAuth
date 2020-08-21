

const UserManageModel = {
    namespace: 'UserManageModel',
    state: {
        resetPasswordModal: false,
        currentResetUser: 0,

    },
    effects: {

    },
    reducers: {
        changeResetPasswordModal(state, action) {

            return { ...state, resetPasswordModal: action.payload }
        },
        changeCurrentResetUser(state, action) {

            return { ...state, currentResetUser: action.payload }
        }

    }
}

export default UserManageModel