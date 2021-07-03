# Quick Start

> 在开始之前，推荐先学习 [Vue](https://cn.vuejs.org/) 、 [ES2015+](http://es6.ruanyifeng.com/) 、 [View UI](https://www.iviewui.com/docs/introduce) 、 [Vue CLI 4](https://cli.vuejs.org/zh/)，并正确安装和配置了 [Node.js](https://nodejs.org/) v10 或以上 、[Git](https://git-scm.com/)。提前了解和学习这些知识会非常有帮助。

## Scaffolding

应用的目录结构如下

```bash
├─dist/                    # 生产环境构建目录
├─public/                  # 主页模板目录
├─src/                     # 源码目录
│    ├─api/                # 数据接口目录
│    ├─assets/             # 静态资源文件目录
│    │   ├─icons/          # SVG 目录
│    │   └─css/            # 样式目录
│    │   └─images/         # 业务图片目录
│    ├─components/         # 业务无关公用组件目录
│    │   └─main/           # 布局组件目录
│    ├─config/             # 项目配置目录
│    ├─helpers/            # 全局业务相关工具方法目录
│    ├─lib/                # 工具类目录
│    ├─locale/             # 国际化目录
│    ├─router/             # 路由配置目录
│    ├─store/              # Vuex 配置目录
│    ├─mock/               # mock 目录
│    ├─permission/         # 路由权限目录
│    ├─views/              # 页面容器组件目录
│        ├─home/           # 页面级示例组件
│        │  ├─components/       # 页面级拆分组件容器
│        │  └─index.vue         # 页面路由容器组件
├─.eslintignore            # 指定 eslint 忽略的文件
├─.eslintrc.js             # 配置 eslint 的检测规则
├─.gitignore               # Git 提交忽略的文件配置
├─.browserslistrc          # 项目的打包兼容目标浏览器的范围配置
├─.prettierignore          # Prettier忽略文件配置
├─.prettierrc              # Prettier配置
├─babel.config.js          # babel 编译配置
├─package-lock.json        # 用来锁定依赖的版本号（NPM 自动生成）
├─package.json             # package.json
├─README.md                # 项目介绍
├─tailwind.config.js       # 原子类样式控制插件配置
└─vue.config.js            # 项目脚手架工具配置文件
```

###

## Stacks

- CSS

  - less
  - flex
  - ......

- JS

  - ES7 promise.finally
  - ES7 async
  - ......

- UI Library

  - View UI

- JS Library

  - axios
  - echarts
  - [vue-echarts](https://github.com/ecomfe/vue-echarts)
  - lodash
  - js-cookie
  - [crypto-js](http://github.com/brix/crypto-js)
  - v-clipboard
  - vue-i18n

- Frame

  - Vue
  - Vue-Router
  - Vuex

* Project Automation
  - webpack @4+
  - vue-loader
  - babel @7.0+
  - eslint
  - prettier
  - postcss
    - autoprefixer
  - vue-cli @4+
  - mockjs
  - lint-staged

## Development

1. 进入目录安装依赖，由于环境问题，推荐使用淘宝镜像进行加速

```bash
pnpm install
#或者
yarn install
```

2. 启动本地服务器

```bash
pnpm run serve
```

3. 启动完成后打开浏览器访问 [http://localhost:8080](http://localhost:8080)，如果需要更改启动端口，可在 `vue.config.js` 文件中配置。
