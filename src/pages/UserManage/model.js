import { resetPassword } from './service'


const UserManageModel = {
    namespace: 'UserManageModel',
    state: {
        resetPasswordModal: false,
        currentResetUser: 0,
        postValueEnum: {},
        statusValueEnum: {},
        sexValueEnum: {},
        roleValueEnum: {},
    },
    effects: {

    },
    reducers: {
        changeResetPasswordModal(state, action) {

            return { ...state, resetPasswordModal: action.payload }
        },
        changeCurrentResetUser(state, action) {

            return { ...state, currentResetUser: action.payload }
        },
        SavePostValueEnum(state, action) {

            return { ...state, postValueEnum: action.payload }
        },
        SaveStatusValueEnum(state, action) {

            return { ...state, statusValueEnum: action.payload }
        },
        SaveSexValueEnum(state, action) {

            return { ...state, sexValueEnum: action.payload }
        },
        SaveRoleValueEnum(state, action) {

            return { ...state, roleValueEnum: action.payload }
        }
    }
}

export default UserManageModel