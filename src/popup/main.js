import Vue from 'vue'
import App from './App.vue'
import { BButton, BIconGearFill } from 'bootstrap-vue';

Vue.component('b-button', BButton);
Vue.component('b-icon-gear-fill', BIconGearFill);
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

new Vue({
  el: '#app',
  render: h => h(App)
})
