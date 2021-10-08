<template>
    <div class="text-center">
    <h2 class="text-xl mb-6">Category</h2>
    <form @change="selectCategory">
      <select
        class="pl-2 md:w-1/4 w-8/12 h-10 mb-2 text-black rounded-md"
        v-model="selectedCategory"
      >
        <option hidden value="">-Select Category-</option>
        <option selected value="">-Select category-</option>
        <option v-for="category in allCategories" :key="category">
          {{ category }}
        </option>
      </select>
    </form>
    <hr class="my-14" />
    <Search />
  </div>
</template>

<script>

import { mapGetters, mapActions } from 'vuex'
import categories from '../helpers/categories'
import Search from './Search.vue'

export default {
  name: 'Categories',

  components: { Search },

  computed: mapGetters(['allPosts', 'postErrors']),

  data () {
    return {
      posts: '',
      selectedCategory: '',
      allCategories: categories
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
