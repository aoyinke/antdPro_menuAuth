/**
 * 在生产环境 代理是无法生效的，所以这里没有生产环境的配置
 * The agent cannot take effect in the production environment
 * so there is no configuration of the production environment
 * For details, please see
 * https://pro.ant.design/docs/deploy
 */
export default {
  dev:{ 
    '/system/': {
      target: 'http://192.168.0.200:8090',
      // target: 'http://192.168.50.123:8090',
      changeOrigin: true
     
    },
    '/device/': {
      target: 'http://192.168.0.200:8090',
      // target: 'http://192.168.50.123:8090',
      changeOrigin: true
     
    },
    '/logging/': {
      target: 'http://192.168.0.200:8090',
      // target: 'http://192.168.50.123:8090',
      changeOrigin: true
     
    },
    '/testing/': {
      target: 'http://192.168.0.200:8090',
      // target: 'http://192.168.50.123:8090',
      changeOrigin: true
     
    },
    '/menu': {
      target: 'http://localhost:4000',
      changeOrigin: true
     
    },
  }
};
