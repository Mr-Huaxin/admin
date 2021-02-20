import Vue from 'vue';
import App from './App';

import router from './router';
import Router from 'vue-router' //记得加
import store from './store';

import Element from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import '@/style/reset.css';
import '@/style/common.css';
import '@/assets/loginfont/iconfont.js';

/*全局组件*/
// 分页
import Pagination from "@/components/Pagination";
// 弹窗提示

/*全局组件挂载*/
Vue.component('Pagination',Pagination);

Vue.config.productionTip = false
Vue.use(store);
Vue.use(Element);
Vue.use(Router)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
