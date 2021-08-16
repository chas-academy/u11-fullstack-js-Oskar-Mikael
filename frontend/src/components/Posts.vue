<template>
    <div>
        Users
        <p v-for="post in allPosts" :key="post._id" @click="getUser(post._id)">
            {{ post.username }}
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
    ...mapActions(['fetchPosts', 'getUser']),

    clickUser (id) {
      this.getUser(id)
    }
  }

}
</script>

<style>

</style>
