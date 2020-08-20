import { getMenuList, changeMenu } from './service'
import { changeMenuIntoTree, getExpandedTreeNode,generateNewMenuTree } from '@/utils/utils'
import { message } from 'antd'

const CharManageModel = {
    namespace: 'CharManageModel',
    state: {
        charList: [],
        menuTree: [],
        menuAuthTree: [],
        selectedKeys: [],
        currentUserEuName: '',
        newMenuTree:[],
        authManageModalVisible:false
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
        *fetchPostNewMenu({payload},{put,call}){
            let { menuAuthTree, userRole, selectedKeys, initSelectedKeys } = payload
            console.log(menuAuthTree, userRole, selectedKeys, initSelectedKeys )
            let deleteAuthority = []
            let addAuthority = []
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

            let newMenuTree = generateNewMenuTree(menuAuthTree,userRole,addAuthority,deleteAuthority)
            let res = yield call(changeMenu,newMenuTree)
            if(res.data.code == 200){
                message.info("成功修改权限")
                location.reload(false)
            }
            

            
        }

    },
    reducers: {

        saveMenuTree(state, action) {
            return { ...state, menuTree: action.payload || [] }
        },
        saveMenuAuthTree(state, action) {
            let menuTree = state.menuTree

            let authTree = changeMenuIntoTree(menuTree)
            return { ...state, menuAuthTree: authTree || [] }
        },
        saveSelectedKeys(state, action) {
            let userRole = action.payload
            let menuAuthTree = state.menuAuthTree
            let selectedKeys = getExpandedTreeNode(menuAuthTree, userRole)
            return { ...state, selectedKeys: selectedKeys || [] }

        },
        saveCurrentUserEuName(state, action) {
            let userRole = action.payload
            return { ...state, currentUserEuName: userRole || [] }
        },
        changeAuthManageModalVisible(state,action){

            return {...state,authManageModalVisible:action.payload}
        },
        changeMenuAuth(state, action) {

            let { menuAuthTree, menuTree, userRole, selectedKeys, initSelectedKeys } = action.payload
            let deleteAuthority = []
            let addAuthority = []
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

            let newMenuTree = generateNewMenuTree(menuAuthTree,userRole,addAuthority,deleteAuthority)
            
            return {...state,newMenuTree:newMenuTree || []}

        }


    }
}

export default CharManageModel