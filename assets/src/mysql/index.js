
import Vue from 'vue'
import App from './Index.vue'
import Export2Excel from '@/assets/js/Export2Excel.js';
import api from '@/api';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import '@/assets/css/index.css';
Vue.use(ElementUI);


Vue.config.productionTip = false;
Vue.prototype.Export2Excel = Export2Excel;
Vue.prototype.$api = api;


/* eslint-disable no-new */
new Vue({
  el: '#app',
  components: { App },
  template: '<App/>',
});
