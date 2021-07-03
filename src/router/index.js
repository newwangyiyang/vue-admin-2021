import Vue from 'vue';
import VueRouter from 'vue-router';

import constantRoutes from './constant-routes';
import asyncRoutes from './async-routes';

Vue.use(VueRouter);
const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL, // 读取的为vue.config.js中publicPath属性值，默认为 '/'
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes,
});

export { constantRoutes, asyncRoutes };
export default router;
