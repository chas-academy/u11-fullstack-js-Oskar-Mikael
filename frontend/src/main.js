import Vue from 'vue'
import App from './App.vue'
import router from './helpers/router.js'
import store from './store'
import axios from 'axios'

Vue.config.productionTip = false

axios.defaults.baseURL = 'http://localhost:5000/api/'
axios.defaults.headers.common.authorization = localStorage.getItem('token')

new Vue({
  router,
  store,
  render: (h) => h(App)
}).$mount('#app')
