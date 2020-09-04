import { changeMenuIntoTree, getExpandedTreeNode, generateNewMenuTree } from '@/utils/utils'
import { message } from 'antd'
import { getMenuList, changeMenu } from './service'


const CharManageModel = {
    namespace: 'CharManageModel',
    state: {
        charList: [],
        menuTree: [],
        menuAuthTree: [],
        selectedKeys: [],
        currentUserEuName: '',
        newMenuTree: [],
        authManageModalVisible: false
    },
    effects: {
        /**
         * 
         * @param {拉取菜单树} 
         */
        *fetchMenuTree({ payload }, { put, call }) {
            const routes = yield call(getMenuList)
            yield put({
                type: 'saveMenuTree',
                payload: routes
            })

        },

        /**
         * 提交新菜单树
         */
        *fetchPostNewMenu({ payload }, { put, call }) {
            const { menuAuthTree, userRole, selectedKeys, initSelectedKeys,halfChecked } = payload
            const checked = selectedKeys.concat(halfChecked)
            try {
                console.log("addAuthority", payload)
                const deleteAuthority = []
                const addAuthority = []
                if (initSelectedKeys.length) {
                    initSelectedKeys.forEach(oldKey => {
                        if (!checked.includes(oldKey)) {
                            deleteAuthority.push(oldKey)
                        }

                    })
                }

                if (checked.length) {
                    checked.forEach(newKey => {
                        if (!initSelectedKeys.includes(newKey)) {
                            addAuthority.push(newKey)
                        }
                    })
                }
                console.log("addAuthority", deleteAuthority, addAuthority)

                const newMenuTree = generateNewMenuTree(menuAuthTree, userRole, addAuthority, deleteAuthority)
                const res = yield call(changeMenu, newMenuTree)
                if (res.data.code === 200) {
                    message.info("成功修改权限")
                    yield put({
                        type: 'changeAuthManageModalVisible',
                        payload: false,
                    });
                    location.reload(false)

                } else {
                    message.error(`修改权限失败`)
                }
            } catch (error) {
                console.log(error)
            }




        }

    },
    reducers: {

        saveMenuTree(state, action) {
            return { ...state, menuTree: action.payload || [] }
        },
        saveMenuAuthTree(state) {
            const { menuTree } = state

            const authTree = changeMenuIntoTree(menuTree)
            return { ...state, menuAuthTree: authTree || [] }
        },
        saveSelectedKeys(state, action) {
            const userRole = action.payload
            const { menuAuthTree } = state
            const selectedKeys = getExpandedTreeNode(menuAuthTree, userRole)
            return { ...state, selectedKeys: selectedKeys || [] }

        },
        saveCurrentUserEuName(state, action) {
            const userRole = action.payload
            return { ...state, currentUserEuName: userRole || [] }
        },
        changeAuthManageModalVisible(state, action) {

            return { ...state, authManageModalVisible: action.payload }
        },
        changeMenuAuth(state, action) {

            const { menuAuthTree, userRole, selectedKeys, initSelectedKeys } = action.payload
            const deleteAuthority = []
            const addAuthority = []
            initSelectedKeys.forEach(oldKey => {
                if (!selectedKeys.includes(oldKey)) {
                    deleteAuthority.push(oldKey)
                }

            })

            selectedKeys.forEach(newKey => {
                if (!initSelectedKeys.includes(newKey)) {
                    addAuthority.push(newKey)
                }
            })

            const newMenuTree = generateNewMenuTree(menuAuthTree, userRole, addAuthority, deleteAuthority)

            return { ...state, newMenuTree: newMenuTree || [] }

        }


    }
}

export default CharManageModel