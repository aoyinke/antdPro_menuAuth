// https://umijs.org/config/
import { defineConfig } from 'umi';
import defaultSettings from './defaultSettings';
import proxy from './proxy';
const { REACT_APP_ENV } = process.env;

export default defineConfig({
  hash: true,
  antd: {},
  dva: {
    hmr: true,
  },
  locale: {
    // default zh-CN
    default: 'zh-CN',
    // default true, when it is true, will use `navigator.language` overwrite default
    antd: true,
    baseNavigator: true,
  },
  dynamicImport: {
    loading: '@/components/PageLoading/index',
  },
  targets: {
    ie: 11,
  },
  // umi routes: https://umijs.org/docs/routing
  routes: [
    {
      path: '/user',
      component: '../layouts/UserLayout',
      routes: [
        {
          name: 'login',
          path: '/user/login',
          component: './user/login',
        },
      ],
    },
    {
      path: '/',
      component: '../layouts/SecurityLayout',
      routes: [
        {
          path: '/',
          component: '../layouts/BasicLayout',
          authority: ['admin', 'user'],
          routes: [
            {
              path: '/',
              redirect: '/user/login',
            },
            {
              path: '/welcome',
              name: '欢迎',
              icon: 'smile',
              component: './Welcome',
            },
            {
              path: '/test',
              name: '操作日志模拟',
              icon: 'smile',
              component: './TestPage',
            },
            {
              path: '/ageingTestWithMyTable',
              name: '新Table老化测试',
              icon: 'smile',
              component: './AgeingTestWithMyTable',
            },
            // {
            //   path: '/equipTest',
            //   name: '设备列表测试',
            //   icon: 'smile',
            //   component: './TestEquipList',
            // },
            {
              path: '/testManager',
              name: '测试管理',
              // authority: ['admin'],
              icon: 'bug',
              routes: [
                {
                  path: '/testManager/systemTest',
                  name: '设备测试',
                  authority: ['admin', 'user'],
                  component: './SystemTest', // authority: ['admin'],
                },
                {
                  path: '/testManager/AgeingTest',
                  name: '老化测试',
                  authority: ['admin'],
                  component: './AgeingTest', // authority: ['admin'],
                },
                {
                  path: '/testManager/UpgradeTest',
                  name: '升级测试',
                  authority: ['admin'],
                  component: './UpgradeTest', // authority: ['admin'],
                },
                {
                  path: '/testManager/wareHousingManage',
                  name: '库存测试',
                  component: './wareHousingManage',
                },
                {
                  path: '/testManager/testDetail',
                  name: '标准测试',
                  hideInMenu: true,
                  component: './TestDetail', // authority: ['admin'],
                },
              ],
            },
            {
              path: '/logMange',
              name: '日志管理',
              authority: ['admin'],
              icon: 'calendar',
              routes: [
                {
                  path: '/logMange/operating',
                  name: '操作日志',
                  component: './OperateLogManage',
                },
                {
                  path: '/logMange/test',
                  name: '测试日志',
                  component: './TestLogManage',
                },
              ],
            },
            {
              path: '/systemManage',
              name: '系统管理',
              authority: ['admin'],
              icon: 'control',
              routes: [
                {
                  path: '/systemManage/userManage',
                  name: '用户管理',
                  component: './UserManage',
                },
                {
                  path: '/systemManage/charManage',
                  name: '角色管理',
                  component: './CharManage',
                },
                {
                  path: '/systemManage/dictManage',
                  name: '字典管理',
                  component: './DictManage',
                },
              ],
            },
            {
              path: '/equiManage',
              name: '设备管理',
              icon: 'database',
              routes: [
                {
                  path: '/equiManage/equpiCategory',
                  name: '设备类型',
                  authority: ['admin'],
                  component: './EquiCategory',
                },
                {
                  path: '/equiManage/equipModel',
                  name: '设备型号',
                  authority: ['admin'],
                  component: './DeviceModelManage',
                },
                {
                  path: '/equiManage/alertManage',
                  name: '报警管理',
                  authority: ['admin'],
                  component: './AlertManage',
                },
                {
                  path: '/equiManage/equiList',
                  name: '设备列表',
                  authority: ['admin', 'user'],
                  component: './EquiList',
                },
              ],
            },
            {
              component: './404',
            },
          ],
        },
        {
          component: './404',
        },
      ],
    },
    {
      component: './404',
    },
  ],
  // Theme for antd: https://ant.design/docs/react/customize-theme-cn
  theme: {
    // ...darkTheme,
    'primary-color': defaultSettings.primaryColor,
    'layout-sider-background': ' #0157a9',
    'menu-dark-bg': '#0157a9',
    'menu-dark-submenu-bg': '#0157a9',
    'menu-dark-bg': '#0157a9',
    // 'layout-body-background': '#0157a9',
  },
  // @ts-ignore
  title: false,
  ignoreMomentLocale: true,
  proxy: proxy[REACT_APP_ENV || 'dev'],
  manifest: {
    basePath: '/',
  },
});
