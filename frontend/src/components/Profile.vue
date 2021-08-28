<template>
  <div>
      <h2>
          {{ this.SelectedUser.message.username }}
      </h2>
      <p>
        Posts
      </p>
      <p>
        Post count: {{ userPosts.length }}
      </p>
      <p @click="postNavigate(post._id)" v-for="post in userPosts" :key="post._id">
        {{ post.title }}
      </p>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import axios from 'axios'
export default {
  name: 'Profile',

  computed: mapGetters(['SelectedUser']),

  data () {
    return {
      userPosts: ''
    }
  },

  mounted () {
    this.getUser()
  },

  methods: {
    ...mapActions(['navigateToPost']),

    getUser () {
      axios.get('posts/user/' + this.SelectedUser.message._id)
        .then(res => {
          this.userPosts = res.data.message
          console.log(res)
        })
    },

    postNavigate (id) {
      this.navigateToPost(id)
    }
  }
}
</script>

<style>

</style>
