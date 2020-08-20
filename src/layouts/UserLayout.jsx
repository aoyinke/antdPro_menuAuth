import { DefaultFooter, getMenuData, getPageTitle } from '@ant-design/pro-layout';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { Link, SelectLang, useIntl, connect } from 'umi';
import React from 'react';
import logo from '../assets/logoLogin.png';
import styles from './UserLayout.less';

const UserLayout = props => {
  const {
    route = {
      routes: [],
    },
  } = props;
  const { routes = [] } = route;
  const {
    children,
    location = {
      pathname: '',
    },
  } = props;
  const { formatMessage } = useIntl();
  const { breadcrumb } = getMenuData(routes);
  const title = getPageTitle({
    pathname: location.pathname,
    formatMessage,
    breadcrumb,
    ...props,
  });

  const defaultFooterDom = (
    <DefaultFooter
      copyright={`${new Date().getFullYear()} 网联云控`}
    // links={[
    //   {
    //     key: 'Ant Design Pro',
    //     title: 'Ant Design Pro',
    //     href: 'https://pro.ant.design',
    //     blankTarget: true,
    //   },
    //   {
    //     key: 'github',
    //     title: <GithubOutlined />,
    //     href: 'https://github.com/ant-design/ant-design-pro',
    //     blankTarget: true,
    //   },
    //   {
    //     key: 'Ant Design',
    //     title: 'Ant Design',
    //     href: 'https://ant.design',
    //     blankTarget: true,
    //   },
    // ]}
    />
  );
  return (
    <HelmetProvider>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={title} />
      </Helmet>

      <div className={styles.container}>
        <div className={styles.lang}>
          <SelectLang />
        </div>
        <div className={styles.content}>
          <div className={styles.top}>
            <div className={styles.header}>
              <img alt="logo" className={styles.logo} src={logo} />
              {/* <span className={styles.title}>网联云控1</span> */}
            </div>
            {/* <div className={styles.desc}>网联云控</div> */}
          </div>
          {children}
        </div>
        <div className={styles.copyright}>
          <p>{`Copyright © 2020 网联云控`}</p>
        </div>
      </div>
    </HelmetProvider>
  );
};

export default connect(({ settings }) => ({ ...settings }))(UserLayout);
