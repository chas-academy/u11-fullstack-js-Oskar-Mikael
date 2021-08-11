import Vue from 'vue'
import Router from 'vue-router'

import Home from '../components/Home.vue'
import Login from '../components/Login.vue'
import Posts from '../components/Posts.vue'
import Register from '../components/Register.vue'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes: [
    { path: '/', component: Home },
    { path: '/login', component: Login },
    { path: '/posts', component: Posts },
    { path: '/register', component: Register },

    { path: '*', component: Home }
  ]
})

export default router
