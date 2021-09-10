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
    commit('loadingTrue')
    axios.get('posts/category?category=' + category)
      .then(res => {
        commit('setPosts', res.data.posts)
        commit('setPostErrors', '')
        router.push('/posts')
        console.log(res)
        commit('loadingFalse')
      })
      .catch(err => {
        commit('setPosts', '')
        commit('setPostErrors', err.response.data.message)
        router.push('/posts')
        console.log(err)
        commit('loadingFalse')
      })
  },

  searchPosts ({ commit }, form) {
    commit('loadingTrue')
    axios.get('posts/search?category=' + form.selectedCategory + '&title=' + form.searchTitle)
      .then(res => {
        commit('setPosts', res.data.posts)
        commit('setPostErrors', '')
        router.push('/posts')
        console.log(res)
        commit('loadingFalse')
      })
      .catch(err => {
        commit('setPosts', '')
        commit('setPostErrors', err.response.data.message)
        router.push('/posts')
        console.log(err)
        commit('loadingFalse')
      })
  },

  createPost ({ commit }, form) {
    commit('loadingTrue')
    axios.post('posts', form)
      .then(res => {
        console.log(res)
        commit('setSelectedPost', res.data)
        commit('setPostErrors', '')
        router.push('/posts/' + res.data.message._id)
        commit('loadingFalse')
      })
      .catch(err => {
        commit('setPostErrors', err.response.data.error)
        console.log(err.response)
      })
  },

  navigateToPost ({ commit }, id) {
    commit('loadingTrue')
    axios.get('/posts/' + id)
      .then(res => {
        commit('setSelectedPost', res.data)
        router.push('/posts/' + id)
        commit('loadingFalse')
      })
  },

  navigateToEditPost ({ commit }, id) {
    commit('loadingTrue')
    axios.get('/posts/' + id)
      .then(res => {
        commit('setSelectedPost', res.data)
        router.push('/edit-post/' + id)
        commit('loadingFalse')
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
