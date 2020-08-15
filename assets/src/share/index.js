
import Vue from 'vue'
import App from './App.vue'

import api from '@/api';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import '@/assets/css/index.css';
Vue.use(ElementUI);

import Markdown from "@/components/Vditor.vue"
Vue.component("markdown", Markdown)

Vue.config.productionTip = false;
Vue.prototype.$api = api;

new Vue({
  el: '#app',
  components: { App },
  template: '<App/>',
});
