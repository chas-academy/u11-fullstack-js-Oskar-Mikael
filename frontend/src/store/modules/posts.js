import axios from 'axios'
import router from '../../helpers/router.js'

const state = {
  posts: [],
  post: null,
  postErrors: ''
}

const getters = {
  allPosts: state => state.posts,
  selectedPost: state => state.post,
  postErrors: state => state.postErrors
}

const actions = {
  async fetchPosts ({ commit }) {
    const response = await axios.get('posts')
    commit('setPosts', response.data)
  },

  fetchCategoryPosts ({ commit }, category) {
    axios.get('posts/category?category=' + category)
      .then(res => {
        commit('setPosts', res.data.posts)
        commit('setPostErrors', null)
        console.log(res)
      })
      .catch(err => {
        commit('setPosts', '')
        commit('setPostErrors', err.response.data.message)
        console.log(err)
      })
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
  setSelectedPost: (state, post) => (state.post = post),
  setPostErrors: (state, errors) => (state.postErrors = errors)
}

export default {
  state,
  getters,
  actions,
  mutations
}
