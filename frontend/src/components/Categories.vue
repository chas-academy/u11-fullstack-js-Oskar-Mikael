<template>
    <div class="text-center">
        <h2 class="text-xl mb-6">
          Category
        </h2>
        <form @change="selectCategory">
          <select class="text-black w-1/6 h-8" v-model="selectedCategory">
          <option hidden value="">
            -Select Category-
          </option>
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
        <hr class="my-14">
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
