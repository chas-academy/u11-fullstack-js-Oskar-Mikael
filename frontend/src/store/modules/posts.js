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
        router.push('/posts')
        console.log(res)
      })
      .catch(err => {
        commit('setPosts', '')
        commit('setPostErrors', err.response.data.message)
        router.push('/posts')
        console.log(err)
      })
  },

  searchPosts ({ commit }, form) {
    axios.get('posts/search?category=' + form.selectedCategory + '&title=' + form.searchTitle)
      .then(res => {
        commit('setPosts', res.data.posts)
        commit('setPostErrors', null)
        router.push('/posts')
        console.log(res)
      })
      .catch(err => {
        commit('setPosts', '')
        commit('setPostErrors', err.response.data.message)
        router.push('/posts')
        console.log(err)
      })
  },

  createPost ({ commit }, form) {
    axios.post('posts', form)
      .then(res => {
        console.log(res)
        commit('setSelectedPost', res.data)
        commit('setPostErrors', null)
        router.push('/posts/' + res.data.message._id)
      })
      .catch(err => {
        commit('setPostErrors', err.response.data.error)
        console.log(err.response)
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
