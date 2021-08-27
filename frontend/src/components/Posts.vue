<template>
    <div>
        Posts
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
        <p v-for="post in allPosts" :key="post._id" @click="postNavigate(post._id)">
            {{ post.title }}
        </p>
        <p v-if="this.postErrors">
          {{ this.postErrors }}
        </p>
        <p>
          <router-link to="/create-post">
          Create Post
          </router-link>
        </p>
    </div>
</template>

<script>

import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'Posts',

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
