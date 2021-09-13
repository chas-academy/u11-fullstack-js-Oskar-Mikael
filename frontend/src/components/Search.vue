<template>
  <div class="mt-20">
    <h2 class="text-xl mb-6">
      Custom search
    </h2>
      <p class="mb-2 text-lg">
          Category
      </p>
      <form @submit.prevent="query">
          <select class="text-black w-1/6 h-8 mb-8" v-model="form.selectedCategory">
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
          </select><br>
          <input class="pl-2 w-1/6 h-8 mb-8 text-black" placeholder="Title" type="text" v-model="form.searchTitle"><br>
          <button class="py-2 px-4 bg-green-600 rounded-md" type="submit">
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
