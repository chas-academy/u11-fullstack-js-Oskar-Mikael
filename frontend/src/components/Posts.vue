<template>
    <div>
        Posts
        <p v-for="post in allPosts" :key="post._id" @click="postNavigate(post._id)">
            {{ post.title }}
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

  computed: mapGetters(['allPosts']),

  mounted () {
    this.fetchPosts()
  },

  data () {
    return {
      posts: ''
    }
  },

  methods: {
    ...mapActions(['fetchPosts', 'navigateToPost']),

    postNavigate (id) {
      this.navigateToPost(id)
    }
  }

}
</script>

<style>

</style>
