/**
 * Ant Design Pro v4 use `@ant-design/pro-layout` to handle Layout.
 * You can view component api by:
 * https://github.com/ant-design/ant-design-pro-layout
 */
import ProLayout, { DefaultFooter } from '@ant-design/pro-layout';
import React, { useEffect } from 'react';
import { Link, useIntl, connect, history } from 'umi';
import { Result, Button, Form, Input } from 'antd';
import Authorized from '@/utils/Authorized';
import RightContent from '@/components/GlobalHeader/RightContent';
import ChangePasswordModel from '@/components/createInfoModal'
import { getAuthorityFromRouter } from '@/utils/utils';
import globalStyles from '@/global.less'
import logo from '../assets/logo.png';

const noMatch = (
  <Result
    status={403}
    title="403"
    subTitle="Sorry, you are not authorized to access this page."
    extra={
      <Button type="primary">
        <Link to="/user/login">Go Login</Link>
      </Button>
    }
  />
);

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};
const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};



/**
 * use Authorized check all menu item
 */
const menuDataRender = menuList =>
  menuList.map(item => {
    const localItem = {
      ...item,
      children: item.children ? menuDataRender(item.children) : undefined,
    };
    // if (localItem.name === '操作日志') {
    // }

    return Authorized.check(item.authority, localItem, noMatch);
  });

const defaultFooterDom = (
  <DefaultFooter
    copyright={`${new Date().getFullYear()} 网联云控`}
    links={[
      // {
      //   key: 'Ant Design Pro',
      //   title: 'Ant Design Pro',
      //   href: 'https://pro.ant.design',
      //   blankTarget: true,
      // },
      // {
      //   key: 'github',
      //   title: <GithubOutlined />,
      //   href: 'https://github.com/ant-design/ant-design-pro',
      //   blankTarget: true,
      // },
      // {
      //   key: 'Ant Design',
      //   title: 'Ant Design',
      //   href: 'https://ant.design',
      //   blankTarget: true,
      // },
    ]}
  />
);

const BasicLayout = props => {
  const {
    dispatch,
    children,
    menuDataList,
    settings,
    collapsed,
    showChangePassword,
    location = {
      pathname: '/',
    },
  } = props;
  /**
   * constructor
   */
  useEffect(() => {
    if (dispatch) {
      // dispatch({
      //   type: 'user/fetchCurrent',
      // });

      // dispatch({
      //   type: 'menuModel/fetchMenuData'
      // });
      
    }
  }, [0]);
  /**
   * init variables
   */
  const onFinish = values => {
    console.log('Success:', values);
    if (dispatch) {
      dispatch({
        type: 'user/fetchChangePassword',
        payload: values
      });
    }


  };


  const serverMenuItem = () => {
    const transMenuItem = []
    if (Array.isArray(menuDataList)) {
      menuDataList.forEach((v) => {
        const localV = { ...v, children: v.children ? menuDataRender(v.children) : [] }
        const localMenuDataItem = Authorized.check(v.authority, localV, null)
        transMenuItem.push(localMenuDataItem)
      })
    }
    return transMenuItem
  }

  const LogoItem = ()=>{

    return !collapsed ? (
      <div className={globalStyles.flexCenter}>
        <img src={logo} style={{height:"62px",width:"110px"}} alt="logo" />
        <h1 style={{color:"#fff"}}>V 0.1</h1>
      </div>
      
    ) : <></>
  }

  const handleMenuCollapse = payload => {
    if (dispatch) {
      dispatch({
        type: 'global/changeLayoutCollapsed',
        payload,
      });
    }
  }; // get children authority

  const authorized = getAuthorityFromRouter(props.route.routes, location.pathname || '/') || {
    authority: undefined,
  };

  const { formatMessage } = useIntl();

  return (
    <ProLayout
      logo={LogoItem}
      formatMessage={formatMessage}
      onCollapse={handleMenuCollapse}
      // onMenuHeaderClick={() => history.push('/')}
      menuItemRender={(menuItemProps, defaultDom) => {
        if (menuItemProps.isUrl || !menuItemProps.path) {
          return defaultDom;
        }
        return <Link to={menuItemProps.path}>{defaultDom}</Link>;
      }}
      breadcrumbRender={(routers = []) => [
        {
          path: '/',
          breadcrumbName: formatMessage({
            id: 'menu.home',
          }),
        },
        ...routers,
      ]}
      itemRender={(route, params, routes, paths) => {
        const first = routes.indexOf(route) === 0;
        // return first ? (
        //   <Link to={paths.join('/')}>{route.breadcrumbName}</Link>
        // ) : (
        //     <span>{route.breadcrumbName}</span>
        //   );
        return <span>{route.breadcrumbName}</span>
      }}
      footerRender={() => defaultFooterDom}
      menuDataRender={menuDataRender}
      headerRender={() => <RightContent />}
      {...props}
      {...settings}
    >
      <Authorized authority={authorized.authority} noMatch={noMatch}>
        {children}
      </Authorized>
      <ChangePasswordModel
        title="修改密码" onCancel={() => {
          dispatch({
            type: 'user/changeShowChangePassword',
            payload: false
          })

        }} modalVisible={showChangePassword}>
        <Form
          {...layout}
          name="basic"
          onFinish={onFinish}
        >
          <Form.Item
            label="旧密码"
            name="oldPassword"
            rules={[{ required: true, message: '请输入原始密码' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="新密码"
            name="newPassword"
            rules={[{ required: true, message: '请输入新密码' }]}
          >
            <Input.Password />
          </Form.Item>


          <Form.Item
            label="重复新密码"
            name="repeatPassword"
            rules={[{ required: true, message: '请重复输入新密码' }]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item {...tailLayout}>
            <Button type="primary" htmlType="submit" style={{ display: "flex", justifyContent: "center" }}>
              修改密码
            </Button>
          </Form.Item>
        </Form>
      </ChangePasswordModel>
    </ProLayout>
  );
};

export default connect(({ global, settings, menuModel, user }) => ({
  menuDataList: menuModel.menuDataList,
  collapsed: global.collapsed,
  settings,
  showChangePassword: user.showChangePassword
}))(BasicLayout);
