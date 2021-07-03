module.exports = {
  presets: ['@vue/cli-plugin-babel/preset'],
  env: {
    // 只在开发环境，讲import => require（异步转同步）提高热更新速度
    // 详见： https://panjiachen.gitee.io/vue-element-admin-site/zh/guide/advanced/lazy-loading.html
    development: {
      plugins: ['dynamic-import-node'],
    },
  },
};
