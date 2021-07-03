import Vue from 'vue';
import App from './App';
import options from './setup';

new Vue({
  ...options,
  render: (h) => h(App),
}).$mount('#app');
