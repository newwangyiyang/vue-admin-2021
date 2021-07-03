import Vue from 'vue';
import router from './router';
import store from './store';

import '@/icons';
import '@/permission';
import '@/utils/error-log';

import echarts from '@/echarts';
import directive from './directive';
import ElementUI from 'element-ui';

import '@/styles/index.scss';
import 'element-ui/lib/theme-chalk/index.css';
import 'tailwindcss/tailwind.css';

Vue.config.productionTip = false;
Vue.use(ElementUI).use(directive).use(echarts);

export default {
  router,
  store,
};
