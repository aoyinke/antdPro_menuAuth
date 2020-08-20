/* eslint-disable eslint-comments/disable-enable-pair */

/* eslint-disable import/no-mutable-exports */
let CURRENT = 'NULL';

/**
 * use  authority or getAuthority
 * @param {string|()=>String} currentAuthority
 */
//根据传入的currentAuthority来解析当前用户的权限
const renderAuthorize = Authorized => currentAuthority => {
  if (currentAuthority) {
    if (typeof currentAuthority === 'function') {
      CURRENT = currentAuthority();
    }

    if (
      Object.prototype.toString.call(currentAuthority) === '[object String]' ||
      Array.isArray(currentAuthority)
    ) {
      CURRENT = currentAuthority;
    }
  } else {
    CURRENT = 'NULL';
  }

  return Authorized;
};

export { CURRENT };  // 缓存解析的结果，并暴露给模块外部使用，避免重复解析造成效率损失
export default Authorized => renderAuthorize(Authorized);
