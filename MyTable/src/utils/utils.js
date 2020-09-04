import { parse } from 'querystring';
import pathRegexp from 'path-to-regexp';

/* eslint no-useless-escape:0 import/prefer-default-export:0 */
const reg = /(((^https?:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+(?::\d+)?|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)$/;
export const isUrl = (path) => reg.test(path);
export const isAntDesignPro = () => {
  if (ANT_DESIGN_PRO_ONLY_DO_NOT_USE_IN_YOUR_PRODUCTION === 'site') {
    return true;
  }

  return window.location.hostname === 'preview.pro.ant.design';
}; // 给官方演示站点用，用于关闭真实开发环境不需要使用的特性

export const isAntDesignProOrDev = () => {
  const { NODE_ENV } = process.env;

  if (NODE_ENV === 'development') {
    return true;
  }

  return isAntDesignPro();
};
export const getPageQuery = () => parse(window.location.href.split('?')[1]);
/**
 * props.route.routes
 * @param router [{}]
 * @param pathname string
 */

export const getAuthorityFromRouter = (router = [], pathname) => {
  const authority = router.find(
    ({ routes, path = '/', target = '_self' }) =>
      (path && target !== '_blank' && pathRegexp(path).exec(pathname)) ||
      (routes && getAuthorityFromRouter(routes, pathname)),
  );
  if (authority) return authority;
  return undefined;
};
export const getRouteAuthority = (path, routeData) => {
  let authorities;
  routeData.forEach((route) => {
    // match prefix
    if (pathRegexp(`${route.path}/(.*)`).test(`${path}/`)) {
      if (route.authority) {
        authorities = route.authority;
      } // exact match

      if (route.path === path) {
        authorities = route.authority || authorities;
      } // get children authority recursively

      if (route.routes) {
        authorities = getRouteAuthority(path, route.routes) || authorities;
      }
    }
  });
  return authorities;
};

/**
 *
 * @param {保持token} token
 */
export function setToken(token) {
  localStorage.setItem('token', token); // auto reload
}

export function getToken() {
  try {
    return localStorage.getItem('token');
  } catch (err) {
    console.log('err', err);
  }
  return {};
}

/**
 * 用户登出清除token
 */
export function loginOut() {
  localStorage.setItem('token', '');
  localStorage.setItem('user', '');
}

/**
 *
 * @param {保持用户信息} user
 */
export function setUser(user) {
  const userInfo = JSON.stringify(user);
  localStorage.setItem('user', userInfo); // auto reload
}

/**
 *
 * @param {读取用户信息} user
 */
export function getUser() {
  return localStorage.getItem('user'); // auto reload
}

/**
 *
 * @param {日志转化为Enum类型} typeData
 */
export function EnumValueHandle(typeData) {
  if (typeData) {
    const types = Object.keys(typeData);
    const res = {};
    types.forEach((key) => {
      res[typeData[key]] = { text: key };
    });
    return res;
  }
}

export function getType(cnName, typeData) {
  if (cnName && typeData) {
    return typeData[cnName];
  }
}

/**
 * 将菜单转化为一颗menu树
 */

export function changeMenuIntoTree(menu) {
  let authMenuTree = [];

  if (menu.length && Array.isArray(menu)) {
    authMenuTree = menu.map((menuItem, index) => {
      const authMenuTreeItem = {};

      authMenuTreeItem.title = menuItem.name;
      authMenuTreeItem.key = `0-${index}`;
      authMenuTreeItem.path = menuItem.path;
      if (menuItem.hasOwnProperty('authority')) {
        authMenuTreeItem.authority = menuItem.authority;
      }
      if (menuItem.children) {
        authMenuTreeItem.children = menuItem.children.map((childItem, idx) => {
          const authMenuTreeChildItem = {};
          authMenuTreeChildItem.title = childItem.name;
          authMenuTreeChildItem.key = `0-${index}-${idx}`;
          authMenuTreeChildItem.path = childItem.path;
          if (childItem.hasOwnProperty('authority')) {
            authMenuTreeChildItem.authority = childItem.authority;
          }
          return authMenuTreeChildItem;
        });
      }
      return authMenuTreeItem;
    });
  }
  return authMenuTree;
}

/**
 * 根据菜单权限，动态展开菜单树
 */
export function getExpandedTreeNode(authMenu, userAuth) {
  const selectedKeys = [];
  if (userAuth && authMenu.length) {
    authMenu.forEach((menuItem) => {
      if (menuItem.hasOwnProperty('authority')) {
        if (!menuItem.authority) {
          selectedKeys.push(menuItem.key);
        } else if (menuItem.authority.includes(userAuth)) {
          selectedKeys.push(menuItem.key);
        }
      }

      if (menuItem.children) {
        menuItem.children.forEach((childItem) => {
          if (childItem.hasOwnProperty('authority')) {
            if (!childItem.authority) {
              selectedKeys.push(childItem.key);
            } else if (childItem.authority.includes(userAuth)) {
              selectedKeys.push(childItem.key);
            }
          }
        });
      }
    });
  }

  return selectedKeys;
}

/**
 * 根据新增或删减的keys，生成新的权限菜单树
 */

export function generateNewMenuTree(menuAuthTree, userRole, addAuthority, deleteAuthority) {
  if (menuAuthTree) {
    menuAuthTree.forEach((parentItem) => {
      const par = parentItem;
      par.name = parentItem.title;
      if (addAuthority.includes(par.key)) {
        if (par.authority) {
          par.authority.push(userRole);
        } else {
          par.authority = [userRole];
        }
      }

      if (deleteAuthority.includes(par.key)) {
        if (par.authority) {
          const index = par.authority.indexOf(userRole);
          par.authority.splice(index, 1);
        } else {
          par.authority = [];
        }
      }

      if (par.children) {
        return generateNewMenuTree(par.children, userRole, addAuthority, deleteAuthority);
      }
    });
  }
  return menuAuthTree;
}


// 转换时间格式
export function formateDate(datetime) {
  function addDateZero(num) {
    return num < 10 ? '0' + num : num;
  }
  const d = new Date(datetime);
  const formatdatetime =
    d.getFullYear() +
    '-' +
    addDateZero(d.getMonth() + 1) +
    '-' +
    addDateZero(d.getDate()) +
    ' ' +
    addDateZero(d.getHours()) +
    ':' +
    addDateZero(d.getMinutes()) +
    ':' +
    addDateZero(d.getSeconds());
  return formatdatetime;
}



export const TestTypes = {
  TESTING: { text: "测试" },
  TESTING_FAIL: { text: "测试失败" },
  TESTING_SUCCESS: { text: "测试成功" }
}
export const OldTypes = {
  OLDING_START: { text: "老化开始" },
  OLDING_HEART: { text: "老化心跳" },
  OLDING_LEAK: { text: "老化水淹" },
  OLDING_SHAKE: { text: "老化震动" },
  OLDING_NET: { text: "老化网络" },
  OLDING_SUCCESS: { text: "老化成功" },
  OLDING_ERROR: { text: "老化异常" },
  OLDING_END: { text: "老化异常终止" }
}
export const UpGradeTypes = {
  UPGRADE_GET_PARAM_COMMAND: { text: "升级读取参数命令" },
  UPGRADE_GET_PARAM_REPLY: { text: "升级读取参数应答" },
  UPGRADE_REPLY: { text: "升级应答" },
  UPGRADE_COMMAND: { text: "升级命令" },
  UPGRADE_START: { text: "升级开始" },
  UPGRADE_END: { text: "升级异常终止" },
  UPGRADE_SUCCESS: { text: "升级成功" },

}
export const StockTypes = {
  STOCK_START: { text: "库存开始" },
  STOCK_HEART: { text: "库存心跳" },
  STOCK_ERROR: { text: "库存异常" },
  STOCK_END: { text: "库存异常终止" },
  STOCK_NET: { text: "库存网络" },
  STOCK_OUT: { text: "库存出库" }
}