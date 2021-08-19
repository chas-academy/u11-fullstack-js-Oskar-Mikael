<template>
  <div>
      <h2>
          {{ this.selectedPost.message.title }}
      </h2>
      <p>
          {{ this.selectedPost.message.body }}
      </p>
      <p>
          Posted by <span @click="clickUser">{{ this.selectedPost.message.creator.message.username }}</span>
      </p>
      <p v-if="this.selectedPost.message.creator.message._id === this.StateUser.message._id || this.StateUser.message.isAdmin" @click="postNavigate">
          Edit post
      </p>
      <p v-if="this.selectedPost.message.creator.message._id === this.StateUser.message._id || this.StateUser.message.isAdmin" v-on:click="deletePost">
          Delete post
      </p>
  </div>
</template>

<script>
import { mapGetters, mapActions, mapMutations } from 'vuex'
import axios from 'axios'
import router from '../helpers/router.js'
export default {
  name: 'Post',

  computed: mapGetters(['selectedPost', 'StateUser']),

  mounted () {
    this.getPost()
  },

  methods: {
    ...mapActions(['getUser', 'navigateToEditPost']),
    ...mapMutations(['setSelectedPost']),

    clickUser () {
      this.getUser(this.selectedPost.message.creator.message._id)
    },

    postNavigate () {
      this.navigateToEditPost(this.selectedPost.message._id)
    },

    deletePost () {
      if (confirm('Are you sure you want to delete this post?')) {
        axios.delete('/posts/' + this.selectedPost.message._id)
          .then(res => {
            router.push('/posts')
          })
      }
    },

    getPost () {
      axios.get('/posts/' + this.$route.params.id)
        .then(res => {
          this.setSelectedPost(res.data)
        })
    }
  }
}
</script>

<style>

</style>
