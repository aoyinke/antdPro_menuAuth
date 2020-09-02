/**
 * Ant Design Pro v4 use `@ant-design/pro-layout` to handle Layout.
 * You can view component api by:
 * https://github.com/ant-design/ant-design-pro-layout
 */
import ProLayout, { DefaultFooter, SettingDrawer } from '@ant-design/pro-layout';
import React, { useEffect } from 'react';
import { RouterTypes } from '@ant-design/pro-layout/lib/typings';
import { Link, useIntl, connect, history } from 'umi';
import { GithubOutlined } from '@ant-design/icons';
import { Result, Button } from 'antd';
import Authorized from '@/utils/Authorized';
import RightContent from '@/components/GlobalHeader/RightContent';
import { getAuthorityFromRouter } from '@/utils/utils';
import logo from '../assets/logo.svg';





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

/**
 * use Authorized check all menu item
 */
const menuDataRender = menuList =>
  menuList.map(item => {
    const localItem = {
      ...item,
      children: item.children ? menuDataRender(item.children) : undefined,
    };
    return Authorized.check(item.authority, localItem, null);
  });

const defaultFooterDom = (
  <DefaultFooter
    copyright={`${new Date().getFullYear()} 蚂蚁金服体验技术部出品`}
    links={[
      {
        key: 'Ant Design Pro',
        title: 'Ant Design Pro',
        href: 'https://pro.ant.design',
        blankTarget: true,
      },
      {
        key: 'github',
        title: <GithubOutlined />,
        href: 'https://github.com/ant-design/ant-design-pro',
        blankTarget: true,
      },
      {
        key: 'Ant Design',
        title: 'Ant Design',
        href: 'https://ant.design',
        blankTarget: true,
      },
    ]}
  />
);
const BasicLayout = props => {
  const {
    dispatch,
    children,
    settings,
    location = {
      pathname: '/',
    },
  } = props;
  /**
   * constructor
   */

  useEffect(() => {
    if (dispatch) {
      dispatch({
        type: 'user/fetchCurrent',
      });
    }
  }, []);
  /**
   * init variables
   */

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

  const complexMenu = [
    {
      path: '/home',
      name: '首页',
      locale: 'menu.home',
      children: [
        {
          path: '/home/overview',
          name: '概述',
          hideInMenu: true,
          locale: 'menu.home.overview',
        },
        {
          path: '/home/search',
          name: '搜索',
          hideInMenu: true,
          locale: 'menu.home.search',
        },
      ],
    },
    {
      path: '/data_hui',
      name: '汇总数据',
      locale: 'menu.data_hui',
      children: [
        {
          collapsed: true,
          menuName: '域买家维度交易',
          name: '域买家维度交易',
          children: [
            {
              id: 2,
              name: '_交易_买家_月表',
              path: '/data_hui2',
            },
            {
              name: '_航旅交易_买家_日表',
              path: '/data_hui?tableName=adm_rk_cr_tb_trv_byr_ds&tableSchema=alifin_odps_birisk',
            },
          ],
        },
        {
          name: '域买家维度交易2',
          path: '/',
          children: [
            {
              name: '_交易_买家_月表',
              path: '/data_hui3',
            },
            {
              name: '_航旅交易_买家_日表',
              key: 'tableName=adm_rk_cr_tb_trv_byr_ds&tableSchema=alifin_odps_birisk',
              path: '/data_hui4',
            },
          ],
        },
      ],
    },
    {
      path: '/data_ming',
      name: '明细数据',
      locale: 'menu.data_ming',
      children: [
        {
          path: '/other/outLoadMenu',
          name: '菜单导出',
          locale: 'menu.other.outLoadMenu',
          hideInMenu: true,
        },
        {
          path: '/other/homeEdit',
          name: '概述导出',
          locale: 'menu.other.outHomeEdit',
        },
      ],
    },
    {
      path: '/other',
      name: '其他',
      locale: 'menu.other',
      children: [
        {
          path: '/other/upLoad',
          name: 'odps同步导入',
          locale: 'menu.other.upLoad',
        },
        {
          path: '/other/upLoadMenu',
          name: '菜单导入',
          locale: 'menu.other.upLoadMenu',
        },
        {
          path: '/other/homeEdit',
          name: '概述编辑',
          locale: 'menu.other.homeEdit',
          hideInMenu: true,
        },
      ],
    },
  ];
  console.log("RouterTypes", RouterTypes)
  return (
    <>
      <ProLayout
        logo={logo}
        layout="top"

        formatMessage={formatMessage}
        onCollapse={handleMenuCollapse}
        onMenuHeaderClick={() => history.push('/')}
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
          console.log("routes", routes)
          const first = routes.indexOf(route) === 0;
          return first ? (
            <Link to={paths.join('/')}>{route.breadcrumbName}</Link>
          ) : (
              <span>{route.breadcrumbName}</span>
            );
        }}
        footerRender={() => defaultFooterDom}
        menuDataRender={menuDataRender}
        rightContentRender={() => <RightContent />}
        {...props}
        {...settings}

      >
        <Authorized authority={authorized.authority} noMatch={noMatch}>
          {children}
        </Authorized>
      </ProLayout>
      <SettingDrawer
        settings={settings}
        onSettingChange={config =>
          dispatch({
            type: 'settings/changeSetting',
            payload: config,
          })
        }
      />

    </>
  );
};

export default connect(({ global, settings }) => ({
  collapsed: global.collapsed,
  settings,
}))(BasicLayout);
