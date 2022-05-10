import Vue from 'vue'
import App from './App.vue'

import axios from 'axios'

import 'bootstrap/dist/css/bootstrap.min.css'
import 'jquery/src/jquery.js'
import 'bootstrap/dist/js/bootstrap.min.js'
import router from './router'

import VueToastr from "vue-toastr";
Vue.use(VueToastr);

Vue.prototype.$axios = axios
Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
