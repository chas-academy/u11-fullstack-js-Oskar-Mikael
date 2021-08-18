import axios from 'axios'
import router from '../../helpers/router.js'

const state = {
  posts: [],
  post: null
}

const getters = {
  allPosts: state => state.posts,
  selectedPost: state => state.post
}

const actions = {
  async fetchPosts ({ commit }) {
    const response = await axios.get('posts')
    commit('setPosts', response.data)
  },

  createPost ({ commit }, form) {
    axios.post('posts', form)
      .then(res => {
        console.log(res)
        router.push('/posts')
      })
  },

  navigateToPost ({ commit }, id) {
    axios.get('/posts/' + id)
      .then(res => {
        commit('setSelectedPost', res.data)
        router.push('/posts/' + id)
      })
  },

  navigateToEditPost ({ commit }, id) {
    axios.get('/posts/' + id)
      .then(res => {
        commit('setSelectedPost', res.data)
        router.push('/edit-post/' + id)
      })
  }
}

const mutations = {
  setPosts: (state, posts) => (state.posts = posts),
  setSelectedPost: (state, post) => (state.post = post)
}

export default {
  state,
  getters,
  actions,
  mutations
}
