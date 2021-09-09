<template>
  <div>
      <h2>
          {{ this.StateUser.message.username }}
      </h2>
      <h3>
        Posts
      </h3>
      <p v-for="post in posts" :key="post._id" @click="postNavigate(post._id)">
        {{ post.title }}
      </p>
      <h3>
        Settings
      </h3>
      <p>
        Private Profile
      </p>
      <form v-if="!this.StateUser.message.isPrivate" @change="privateTrue($store.getters.StateUser.message._id)">
        <input type="checkbox"/>
      </form>
      <form v-else @change="privateFalse($store.getters.StateUser.message._id)">
        <input type="checkbox" checked/>
      </form>
      <p>
        Update password
      </p>
      <form @submit.prevent="updatePassword">
        <input type="password" v-model="form.newPassword">
        <button type="submit">Change Password</button>
      </form>
  </div>
</template>

<script>
import { mapGetters, mapActions, mapMutations } from 'vuex'
import axios from 'axios'
export default {
  name: 'MyProfile',

  data () {
    return {
      form: {
        newPassword: ''
      },
      posts: ''
    }
  },

  mounted () {
    this.getUserPosts()
    this.getUser()
  },

  computed: mapGetters(['StateUser']),

  methods: {
    ...mapActions(['navigateToPost']),
    ...mapMutations(['loadingTrue', 'loadingFalse']),

    updatePassword () {
      this.loadingTrue()
      axios.patch('/users/change-password', this.form)
        .then(res => {
          console.log(res)
          alert(res.data.message)
          this.loadingFalse()
        })
        .catch(err => {
          console.log(err)
          alert(err.response.data.message)
          this.loadingFalse()
        })
    },

    getUserPosts () {
      this.loadingTrue()
      axios.get('/posts/user/' + this.StateUser.message._id)
        .then(res => {
          this.posts = res.data.message
          console.log(res)
          this.loadingFalse()
        })
    },

    postNavigate (id) {
      this.navigateToPost(id)
    },

    getUser () {
      this.loadingTrue()
      axios.get('/users/' + this.StateUser.message._id)
        .then(res => {
          this.$store.commit('setUser', res.data)
          console.log(res)
          this.loadingFalse()
        })
    },

    privateTrue (id) {
      axios.patch('/users/private-true/' + id)
        .then(res => {
          console.log(res)
        })
    },

    privateFalse (id) {
      axios.patch('/users/private-false/' + id)
        .then(res => {
          console.log(res)
        })
    }
  }

}
</script>

<style>

</style>
