import Vuex from 'vuex'
import Vue from 'vue'
import createPersistedState from 'vuex-persistedstate'
import posts from './modules/posts.js'
import auth from './modules/auth.js'
import loading from './modules/loading.js'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    posts,
    auth,
    loading
  },
  plugins: [createPersistedState()]
})
