
import Vue from 'vue'
import App from './Index1.vue'
import router from './router.js'

import Export2Excel from '@/assets/js/Export2Excel.js';
import api from '@/api';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import '@/assets/css/index.css';
Vue.use(ElementUI);

import mavonEditor from 'mavon-editor';
import 'mavon-editor/dist/css/index.css';
Vue.use(mavonEditor);
import MdEditor from "@/components/MarkdownEditor.vue"
import Markdown from "@/components/Vditor.vue"
Vue.component("markdown-editor", MdEditor)
Vue.component("markdown", Markdown)

import VueClipboard from 'vue-clipboard2'
VueClipboard.config.autoSetContainer = true
Vue.use(VueClipboard)


Vue.config.productionTip = false;
Vue.prototype.Export2Excel = Export2Excel;
Vue.prototype.$api = api;


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>',
});
