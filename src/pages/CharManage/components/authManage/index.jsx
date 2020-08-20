import React, { useState, useEffect } from 'react'
import { Tree, Button, message } from 'antd';
import { connect } from 'dva'


const AuthManage = props => {

    const { dispatch, menuAuthTree, initSelectedKeys, userAuth, newMenuTree } = props
    /**
     * 将修改权限的操作，从props中取出
     */
    let { confirmChangeAuth } = props

    const [expandedKeys, setExpandedKeys] = useState(() => initSelectedKeys);
    const [checkedKeys, setCheckedKeys] = useState(() => initSelectedKeys);
    const [selectedKeys, setSelectedKeys] = useState(() => initSelectedKeys);
    const [autoExpandParent, setAutoExpandParent] = useState(true);

    useEffect(() => {

    })



    const changeAuth =  () => {


        if (checkedKeys == initSelectedKeys) {
            message.error("并无修改")
        } else {
            let payload = { menuAuthTree: menuAuthTree, userRole: userAuth, selectedKeys: checkedKeys, initSelectedKeys: initSelectedKeys }
            
            dispatch({
                type: "CharManageModel/fetchPostNewMenu",
                payload
            })
            confirmChangeAuth()
        }
        

    }
    const onExpand = expandedKeys => {
        console.log('onExpand', expandedKeys); // if not set autoExpandParent to false, if children expanded, parent can not collapse.
        // or, you can remove all expanded children keys.

        setExpandedKeys(() => expandedKeys);
        setAutoExpandParent(false);
    };

    const onCheck = checkedKeys => {
        console.log('onCheck', checkedKeys);
        setCheckedKeys(() => checkedKeys);
    };

    const onSelect = (selectedKeys, info) => {
        console.log('onSelect', info);
        setSelectedKeys(() => selectedKeys);
    };

    return (
        <>
            <Tree
                checkable
                onExpand={onExpand}
                expandedKeys={expandedKeys}
                autoExpandParent={autoExpandParent}
                onCheck={onCheck}
                checkedKeys={checkedKeys}
                onSelect={onSelect}
                selectedKeys={selectedKeys}
                treeData={menuAuthTree}
                
            />
            <div style={{ display: 'flex', justifyContent: "center", alignItems: "center" }}>
                <Button type="primary" onClick={changeAuth}>确认修改</Button>
            </div>

        </>
    )
}

export default connect(({ CharManageModel, loading }) => ({
    menuTree: CharManageModel.menuTree,
    menuAuthTree: CharManageModel.menuAuthTree,
    initSelectedKeys: CharManageModel.selectedKeys,
    newMenuTree: CharManageModel.newMenuTree,
    loading: loading.effects['CharManageModel/fetchMenuTree'],
}))(AuthManage)