<template>
  <div class="mt-20">
    <h2 class="text-xl mb-6">Custom search</h2>
    <form @submit.prevent="query">
      <select
        class="pl-2 md:w-1/4 w-8/12 h-10 mb-8 text-black rounded-md"
        v-model="form.selectedCategory"
      >
        <option hidden value="">-Select Category-</option>
        <option v-for="category in allCategories" :key="category">
          {{ category }}
        </option></select
      ><br />
      <input
        class="pl-2 md:w-1/4 w-8/12 h-10 mb-4 text-black rounded-md"
        placeholder="Title"
        type="text"
        v-model="form.searchTitle"
      /><br />
      <button class="py-2 px-4 bg-green-600 rounded-md" type="submit">
        Search
      </button>
    </form>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import categories from '../helpers/categories'
export default {
  name: 'Search',

  data () {
    return {
      form: {
        selectedCategory: '',
        searchTitle: ''
      },
      allCategories: categories
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
