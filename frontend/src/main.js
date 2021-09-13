import Vue from 'vue'
import App from './App.vue'
import router from './helpers/router.js'
import store from './store'
import axios from 'axios'
import './assets/css/tailwind.css'

Vue.config.productionTip = false

axios.defaults.baseURL = 'https://oskarmikaelu11.herokuapp.com/api/'
axios.defaults.headers.common.authorization = localStorage.getItem('token')

new Vue({
  router,
  store,
  render: (h) => h(App)
}).$mount('#app')
