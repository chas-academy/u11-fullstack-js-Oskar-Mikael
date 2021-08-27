<template>
  <div>
      Search
      <p>
          Category
      </p>
      <form @submit.prevent="query">
          <select v-model="form.selectedCategory">
            <option>
              Family
            </option>
            <option>
              Sports
            </option>
            <option>
              Coding
            </option>
          </select>
          <p>
              Title
          </p>
          <input type="text" v-model="form.searchTitle">
          <button type="submit">
              Search
          </button>
      </form>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'Search',

  data () {
    return {
      form: {
        selectedCategory: '',
        searchTitle: ''
      }
    }
  },

  methods: {
    ...mapActions(['searchPosts']),

    query () {
      this.searchPosts(this.form)
    }
  }
}
</script>

<style>

</style>
