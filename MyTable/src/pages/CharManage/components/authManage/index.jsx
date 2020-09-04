import React, { useState, useEffect } from 'react'
import { Tree, Button, message } from 'antd';
import { connect } from 'dva'


const AuthManage = props => {

    const { dispatch, menuAuthTree, initSelectedKeys, userAuth } = props


    const [expandedKeys, setExpandedKeys] = useState(() => initSelectedKeys);
    const [checkedKeys, setCheckedKeys] = useState(() => initSelectedKeys);
    const [halfChecked, setHalfChecked] = useState([])
    const [selectedKeys, setSelectedKeys] = useState(() => initSelectedKeys);
    const [autoExpandParent, setAutoExpandParent] = useState(true);

    useEffect(() => {

    })



    const changeAuth = () => {


        if (checkedKeys === initSelectedKeys) {
            message.error("并无修改")
        } else {
            const payload = { menuAuthTree, userRole: userAuth, selectedKeys: checkedKeys, initSelectedKeys, halfChecked }
            dispatch({
                type: "CharManageModel/fetchPostNewMenu",
                payload
            })

        }


    }
    const onExpand = expanded => {
        console.log('onExpand', expanded); // if not set autoExpandParent to false, if children expanded, parent can not collapse.
        // or, you can remove all expanded children keys.

        setExpandedKeys(() => expanded);
        setAutoExpandParent(false);
    };

    // const onCheck = (checked, { halfCheckedKeys }) => {
    //     console.log('onCheck', checked.concat(halfCheckedKeys), initSelectedKeys);
    //     setCheckedKeys(() => checked);
    //     setHalfChecked(() => halfCheckedKeys)
    // };
    const onCheck = (checked) => {
        console.log('onCheck',checked, initSelectedKeys);
        setCheckedKeys(() => checked.checked);
        // setHalfChecked(() => halfCheckedKeys)
    };

    const onSelect = (selected, info) => {
        console.log('onSelect', info);
        setSelectedKeys(() => selected);
    };

    return (
        <>
            <Tree
                checkable
                checkStrictly
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