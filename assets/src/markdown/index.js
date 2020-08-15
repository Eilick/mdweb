
import Vue from 'vue'
import App from './Index.vue'
import router from './router.js'

import api from '@/api';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import '@/assets/css/index.css';
Vue.use(ElementUI);

import Markdown from "@/components/Vditor.vue"
Vue.component("markdown", Markdown)

Vue.config.productionTip = false;
Vue.prototype.$api = api;


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>',
});
