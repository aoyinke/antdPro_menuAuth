import React, { useRef, useEffect, useState } from 'react';
import { PlusOutlined, DownOutlined } from '@ant-design/icons';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { Button, Menu, Dropdown, message } from 'antd';
import ProTable from '@ant-design/pro-table';
import CreateRole from '@/components/createInfoModal';
import DeleteRoleModal from '@/components/DeleteModal';
import CreateRoleModal from '@/components/CreateModal';
import ModifyRoleModal from '@/components/ModifyModal';
import { connect } from 'umi';
import AuthManage from './components/authManage';
import { getCharList, changeRoleInfo, deleteRole, createRole } from './service';
import { columns, modifyColumns } from './columns';

const CharManage = (props) => {
  const actionRef = useRef();
  const [selectedRole, handleSelectedRole] = useState([]);
  const modifyRef = useRef();

  const { dispatch, currentUserEuName } = props;
  const { authManageModalVisible } = props;
  useEffect(() => {
    dispatch({
      type: 'CharManageModel/fetchMenuTree',
    });
  }, []);
  /**
   *
   * @param {批量处理菜单点击事件}
   */
  async function handleMenuClick(e) {
    if (selectedRole.length) {
      if (e.key === 'remove') {
        dispatch({
          type: 'GlobalModel/changeDeleteModalVisible',
          payload: true,
        });
      }
    }
  }

  /**
   * 批量处理菜单
   */
  const menu = (
    <Menu onClick={handleMenuClick}>
      <Menu.Item key="remove">删除角色</Menu.Item>
      {/* <Menu.Item key="2">2nd item</Menu.Item>
            <Menu.Item key="3">3rd item</Menu.Item> */}
    </Menu>
  );

  /**
   * 添加角色
   * @param fields
   */
  const createRoleFunc = async (value) => {
    const hide = message.loading('正在添加');

    try {
      const res = await createRole(value);
      if (res.code === 200) {
        message.success('添加成功');
        actionRef.current.reload();
      } else {
        message.error(`添加失败：${res.message}`);
      }
      hide();
    } catch (error) {
      hide();
      message.error(`添加失败${error}`);
    }
  };

  /**
   * 删除角色
   * @param fields
   */

  const deleteRoleFunc = async () => {
    const ids = selectedRole.map((item) => {
      return item.id;
    });

    const hide = message.loading('正在删除');

    try {
      const res = await deleteRole(ids);
      if (res.code === 200) {
        message.success('删除成功，即将刷新');

        actionRef.current.reload();
        actionRef.current.clearSelected();
      } else {
        message.error(`删除失败，${res.message}`);
      }
      hide();
    } catch (error) {
      hide();
      message.error(`删除失败:${error}`);
    }
  };

  /**
   * 更新角色
   * @param fields
   */

  const handleUpdate = async (params) => {
    const hide = message.loading('正在修改');

    try {
      const res = await changeRoleInfo(params);
      if (res.code === 200) {
        message.success('修改成功');
        actionRef.current.reload();
      } else {
        message.success(`修改失败${res.message}`);
      }
      hide();
    } catch (error) {
      hide();
      message.error('修改失败请重试！');
    }
  };

  /**
   *
   * @param {获取菜单树} authTree
   */
  const getMenuTree = () => {
    dispatch({
      type: 'CharManageModel/saveMenuAuthTree',
    });
  };

  /**
   *
   * @param {生成selectedKeys} selectedKeys
   */

  const generateSelectedKeys = (role) => {
    dispatch({
      type: 'CharManageModel/saveSelectedKeys',
      payload: role,
    });
  };


  const options = (text, row, _, action) => [
    <Button
      onClick={() => {
        dispatch({
          type: 'CharManageModel/changeAuthManageModalVisible',
          payload: true,
        });
        dispatch({
          type: 'CharManageModel/saveCurrentUserEuName',
          payload: row.roleEuName,
        });
        generateSelectedKeys(row.roleEuName);
      }}
    >
      权限
    </Button>,
    <Button
      type="primary"
      onClick={() => {
        dispatch({
          type: 'GlobalModel/changeModifyModalVisible',
          payload: true,
        });

        dispatch({
          type: 'GlobalModel/saveCurrentRowData',
          payload: row,
        });
        setTimeout(() => {
          modifyRef.current.setFieldsValue(row);
        }, 100);
      }}
    >
      修改
    </Button>,
  ];

  return (
    <PageHeaderWrapper title={false}>
      <ProTable
        columns={columns(options)}
        pagination={{
          showQuickJumper: true,
        }}
        search={false}
        actionRef={actionRef}
        request={async (params) => {
          const par = params;
          par.pageNum = params.current;
          try {
            const res = await getCharList(par);
            getMenuTree();
            if (res.code === 200) {
              return Promise.resolve({
                data: res.data.rows,
                success: true,
                total: res.data.total,
              });
            }
            message.error(`获取角色列表错误，状态码:${res.code}`);
          } catch (error) {
            message.error(`获取角色列表错误，状态码:${res.code}`);
          }
          return Promise.resolve({
            success: true,
          });
        }}
        rowKey="id"
        rowSelection={{
          onChange: (selectedRowKeys, selectedRows) => {
            handleSelectedRole(selectedRows);
          },
        }}
        dateFormatter="string"
        headerTitle="角色管理"
        toolBarRender={() => [
          <Button
            key="3"
            type="primary"
            onClick={() => {
              dispatch({
                type: 'GlobalModel/changeCreateModalVisible',
                payload: true,
              });
            }}
          >
            <PlusOutlined />
            新建
          </Button>,
          <Dropdown overlay={menu}>
            <Button key="4">
              批量处理 <DownOutlined />
            </Button>
          </Dropdown>,
        ]}
      />

      <CreateRoleModal title="新建角色" columns={columns(options)} onSubmit={createRoleFunc} />
      <ModifyRoleModal
        title="修改角色"
        modifyColumns={modifyColumns}
        modifyRef={modifyRef}
        onSubmit={handleUpdate}
      />
      <DeleteRoleModal title="删除角色" deleteFunc={deleteRoleFunc} />
      <CreateRole
        title="配置权限"
        onCancel={() => {
          dispatch({
            type: 'CharManageModel/changeAuthManageModalVisible',
            payload: false,
          });
        }}
        modalVisible={authManageModalVisible}
      >
        <AuthManage  userAuth={currentUserEuName} />
      </CreateRole>
    </PageHeaderWrapper>
  );
};

export default connect(({ CharManageModel, loading }) => ({
  menuTree: CharManageModel.menuTree,
  menuAuthTree: CharManageModel.menuAuthTree,
  selectedKeys: CharManageModel.selectedKeys,
  currentUserEuName: CharManageModel.currentUserEuName,
  authManageModalVisible: CharManageModel.authManageModalVisible,
  loading: loading.effects['CharManageModel/fetchMenuTree'],
}))(React.memo(CharManage));
