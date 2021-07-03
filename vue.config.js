const path = require('path');
const CompressionWebpackPlugin = require('compression-webpack-plugin');

module.exports = {
  publicPath: process.env.NODE_ENV === 'production' ? '/' : '/', // 设置output.publicPath，区分生产环境和开发环境
  outputDir: 'dist',
  assetsDir: 'static',
  productionSourceMap: false,
  css: {
    loaderOptions: {
      less: {
        javascriptEnabled: true,
      },
    },
    // 开启 CSS source maps
    sourceMap: process.env.NODE_ENV === 'production' ? false : true,
  },
  devServer: {
    // 配置 webpack-dev-server 行为。
    open: process.env.NODE_ENV === 'development',
    host: '0.0.0.0',
    port: 8080,
    https: false,
    hot: true,
    hotOnly: true,
    proxy: {
      // change xxx-api/login => mock/login
      // detail: https://cli.vuejs.org/config/#devserver-proxy
      [process.env.VUE_APP_BASE_API]: {
        target: `https://e.juejin.cn/`,
        changeOrigin: true,
        pathRewrite: {
          ['^' + process.env.VUE_APP_BASE_API]: '',
        },
      },
    }, // string | Object
    before: (app) => {},
  },
  parallel: false,
  configureWebpack: {
    name: 'html title',
  },
  chainWebpack: (config) => {
    // it can improve the speed of the first screen, it is recommended to turn on preload
    config.plugin('preload').tap(() => [
      {
        rel: 'preload',
        // to ignore runtime.js
        // https://github.com/vuejs/vue-cli/blob/dev/packages/@vue/cli-service/lib/config/app.js#L171
        fileBlacklist: [/\.map$/, /hot-update\.js$/, /runtime\..*\.js$/],
        include: 'initial',
      },
    ]);

    // when there are many pages, it will cause too many meaningless requests
    config.plugins.delete('prefetch');

    // set svg-sprite-loader
    config.module.rule('svg').exclude.add(resolve('src/icons')).end();
    config.module
      .rule('icons')
      .test(/\.svg$/)
      .include.add(resolve('src/icons'))
      .end()
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({
        symbolId: 'icon-[name]',
      })
      .end();

    // 新增别名
    config.resolve.alias
      .set('@$', resolve('src'))
      .set('@assets', resolve('src/assets'))
      .set('vue$', 'vue/dist/vue.esm.js')
      .set('@c', resolve('src/components'));

    config.when(process.env.NODE_ENV !== 'development', (config) => {
      // 1、压缩html中的css
      config.plugin('html').tap((args) => {
        args[0].minify.minifyCSS = true;
        return args;
      });
      // 2、去除console.log 、debugger
      config.optimization.minimizer('terser').tap((args) => {
        args[0].terserOptions.compress.drop_console = true;
        args[0].terserOptions.compress.drop_debugger = true;
        return args;
      });
      // 2-1、抽离runtime.xxx.js文件，将代码块直接放入html，避免二次请求
      config
        .plugin('ScriptExtHtmlWebpackPlugin')
        .after('html')
        .use('script-ext-html-webpack-plugin', [
          {
            // `runtime` must same as runtimeChunk name. default is `runtime`
            inline: /runtime\..*\.js$/,
          },
        ])
        .end();

      // 3、gzip需要nginx进行配合
      config
        .plugin('compression')
        .use(CompressionWebpackPlugin)
        .tap(() => [
          {
            algorithm: 'gzip',
            minRatio: 0.8,
            test: /\.js$|\.html$|\.css$/, // 匹配文件名
            threshold: 4096, // 超过4k进行压缩
            deleteOriginalAssets: false, // 是否删除源文件
          },
        ]);
      // 4、去掉空格，减少打包体积
      config.module
        .rule('vue')
        .use('vue-loader')
        .loader('vue-loader')
        .tap((options) => {
          // modify the options...
          options.compilerOptions.preserveWhitespace = true;
          return options;
        });
      // 5、splitChunks 代码分割，
      // SplitChunksPlugin https://webpack.js.org/plugins/split-chunks-plugin/
      config.optimization.splitChunks({
        chunks: 'all',
        cacheGroups: {
          // common: {
          //   name: 'chunk-common',
          //   chunks: 'initial',
          //   minChunks: 2,
          //   maxInitialRequests: 8,
          //   minSize: 0,
          //   // 默认组的优先级为负数，以允许任何自定义缓存组具有更高的优先级（默认值为0）
          //   priority: 1,
          //   reuseExistingChunk: true,
          // },
          vendors: {
            name: 'chunk-vendors',
            test: /[\\/]node_modules[\\/]/,
            chunks: 'initial', // 只打包初始时依赖的第三方
          },
          elementUI: {
            name: 'chunk-elementUI', // 单独将 elementUI 拆包
            priority: 20, // 权重要大于 libs 和 app 不然会被打包进 libs 或者 app
            test: /[\\/]node_modules[\\/]_?element-ui(.*)/, // in order to adapt to cnpm
            reuseExistingChunk: true,
          },
          echarts: {
            name: 'chunk-echarts',
            test: /[\\/]node_modules[\\/](vue-)?echarts[\\/]/,
            chunks: 'all',
            priority: 4,
            reuseExistingChunk: true,
          },
          components: {
            name: 'chunk-components',
            test: resolve('src/components'),
            minChunks: 3,
            priority: 5,
            reuseExistingChunk: true,
          },
        },
      });
      // 6、将runtime.xxx.js单独分割
      // https:// webpack.js.org/configuration/optimization/#optimizationruntimechunk
      config.optimization.runtimeChunk('single');
    });
  },
};

function resolve(dir) {
  return path.join(__dirname, dir);
}
