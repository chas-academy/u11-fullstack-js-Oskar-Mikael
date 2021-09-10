<template>
    <div>
        Categories
        <p>
          Category
        </p>
        <form @change="selectCategory">
          <select v-model="selectedCategory">
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
        </form>
        <p>
          <router-link to="/create-post">
          Create Post
          </router-link>
        </p>
        <Search />
    </div>
</template>

<script>

import { mapGetters, mapActions } from 'vuex'
import Search from './Search.vue'

export default {
  name: 'Categories',

  components: { Search },

  computed: mapGetters(['allPosts', 'postErrors']),

  data () {
    return {
      posts: '',
      selectedCategory: ''
    }
  },

  methods: {
    ...mapActions(['fetchPosts', 'fetchCategoryPosts', 'navigateToPost']),

    postNavigate (id) {
      this.navigateToPost(id)
    },

    selectCategory () {
      this.fetchCategoryPosts(this.selectedCategory)
    }
  }

}
</script>

<style>

</style>
