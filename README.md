# vue-admin-2021

- [参考网址](https://panjiachen.gitee.io/vue-element-admin-site/zh/)

#### eslint-config-alloy

- [中文文档](https://github.com/AlloyTeam/eslint-config-alloy/blob/master/README.zh-CN.md#vue)

#### twindcss

- [官网](https://www.tailwindcss.cn/)

#### layout 独立

#### router 动态添加

#### permission 权限校验

#### tagsView 控制

#### echarts vue-echarts

- [github 地址](https://github.com/ecomfe/vue-echarts/blob/HEAD/README.zh-Hans.md)

#### driver.js 前端引导页

- 触发`start`的事件必须调用,`stopPropagation`
- 针对`fixed`定位元素，高亮元素会不显示出来

#### fuse.js 模糊搜索权重控制

#### transitionend 监听元素通过 transform 改变样式事件

- `e.propertyName`获取改变样式的具体属性名

```js
dom.addEventListener('transitionend', (e) => {
  e.propertyName;
});
```

#### 优雅的全局挂载方案

```js
import moment from 'moment';
Object.defineProperty(Vue.prototype, '$moment', { value: moment });
```

#### 页面不刷新问题

- `/a/1`跳转至`/a/2`，不刷新
- **beforeRouterUpdate(to, from, next)**

#### svg-sprite-loader 将多个 svg 文件最终打包成一个 svg-sprite

- [掘金地址](https://juejin.cn/post/6844903517564436493)
- [svgo](https://github.com/svg/svgo/)
