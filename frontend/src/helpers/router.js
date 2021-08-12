import Vue from 'vue'
import Router from 'vue-router'

import Home from '../components/Home.vue'
import Login from '../components/Login.vue'
import Posts from '../components/Posts.vue'
import Register from '../components/Register.vue'
import Admin from '../components/Admin.vue'
import store from '../store'

Vue.use(Router)

let isAuth = store.getters.isAuthenticated
let user = store.getters.StateUser

const router = new Router({
  mode: 'history',
  routes: [
    { path: '/', component: Home },
    { path: '/login', name: 'login', component: Login },
    { path: '/posts', component: Posts, meta: { isProtected: true } },
    { path: '/register', component: Register },
    { path: '/admin', name: 'admin', component: Admin, meta: { isProtected: true } },

    { path: '*', component: Home }
  ]
})

router.beforeEach((to, from, next) => {
  isAuth = store.getters.isAuthenticated
  user = store.getters.StateUser
  if (to.name === 'login' && isAuth) {
    next({
      path: '/'
    })
  } else if (to.meta.isProtected && !isAuth) {
    next({
      path: '/login'
    })
  } else if (to.name === 'admin' && !user.message.isAdmin) {
    next({
      path: '/'
    })
  } else {
    next()
  }
})

export default router
