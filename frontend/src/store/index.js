import Vuex from 'vuex'
import Vue from 'vue'
import createPersistedState from 'vuex-persistedstate'
import posts from './modules/posts.js'
import auth from './modules/auth.js'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    posts,
    auth
  },
  plugins: [createPersistedState()]
})
