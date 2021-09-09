const state = {
  loading: null
}

const getters = {
  isLoading: state => state.loading
}

const actions = {}

const mutations = {
  loadingTrue (state) {
    state.loading = true
  },

  loadingFalse (state) {
    state.loading = false
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
