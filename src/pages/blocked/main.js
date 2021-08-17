import Vue from 'vue'
import App from './App.vue'

import { BButton, BIconTrashFill } from 'bootstrap-vue';

Vue.component('b-button', BButton);
Vue.component('b-icon-trash-fill', BIconTrashFill);
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

/* eslint-disable no-new */
new Vue({
  el: '#app',
  render: h => h(App)
})
