import { Redirect, Route } from 'umi';
import React from 'react';
import Authorized from './Authorized';


//路由权限组件封装了noMatch和children 的传入值，省去了route和redirect组件的配置
// 用户在使用的时候只需要传入patch 以及对应的重定向地址
const AuthorizedRoute = ({ component: Component, render, authority, redirectPath, ...rest }) => (
  <Authorized
    authority={authority}
    noMatch={
      <Route
        {...rest}
        render={() => (
          <Redirect
            to={{
              pathname: redirectPath,
            }}
          />
        )}
      />
    }
  >
    <Route {...rest} render={props => (Component ? <Component {...props} /> : render(props))} />
  </Authorized>
);

export default AuthorizedRoute;
