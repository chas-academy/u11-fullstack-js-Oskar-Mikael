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
      <p>
        {{ this.selectedPost.message.category }}
      </p>
      <p v-if="this.selectedPost.message.creator.message._id === this.StateUser.message._id || this.StateUser.message.isAdmin" @click="postNavigate">
          Edit post
      </p>
      <p v-if="this.selectedPost.message.creator.message._id === this.StateUser.message._id || this.StateUser.message.isAdmin" @click="deletePost">
          Delete post
      </p>
      <div v-if="this.isAuthenticated">
       <p>
          Comment
        </p>
      <form @submit.prevent="addComment">
        <input type="text" v-model="form.message">
        <p v-if="this.errors">
          {{ errors }}
        </p>
        <button type="submit">Add Comment</button>
      </form>
      </div>
      <p v-if="!this.StateUser.message.likedPosts.includes(this.selectedPost.message._id) && this.isAuthenticated" @click="likePost">
        Like
      </p>
      <p v-else-if="this.isAuthenticated" @click="unlikePost">
        Unlike
      </p>
      <p>
       {{ this.selectedPost.message.likeCount }} likes
      </p>
      <h3>
        Comments
      </h3>
      <div v-for="comment in this.selectedPost.message.comments" :key="comment.id">
        <p>
          {{ comment.message }}
        </p>
        <p>
          By {{ comment.creator.username }}
        </p>
        <p v-if="comment.creator._id === _self.StateUser.message._id || _self.StateUser.message.isAdmin" @click="deleteComment(comment._id)">
          Delete Comment
        </p>
      </div>
  </div>
</template>

<script>
import { mapGetters, mapActions, mapMutations } from 'vuex'
import axios from 'axios'
import router from '../helpers/router.js'
export default {
  name: 'Post',

  computed: mapGetters(['selectedPost', 'StateUser', 'isAuthenticated']),

  data () {
    return {
      form: {
        message: '',
        id: this.$store.getters.selectedPost.message._id
      },
      errors: ''
    }
  },

  mounted () {
    this.getPost()
    this.getUser()
  },

  methods: {
    ...mapActions(['getUser', 'navigateToEditPost']),
    ...mapMutations(['setSelectedPost', 'setUser']),

    clickUser () {
      this.getUser(this.selectedPost.message.creator.message._id)
    },

    postNavigate () {
      this.navigateToEditPost(this.selectedPost.message._id)
    },

    deletePost (id) {
      if (confirm('Are you sure you want to delete this post?')) {
        axios.delete('/posts/' + this.selectedPost.message._id, id)
          .then(res => {
            router.push('/posts')
            console.log(res)
          })
      }
    },

    getPost () {
      axios.get('/posts/' + this.$route.params.id)
        .then(res => {
          this.setSelectedPost(res.data)
          console.log(res.data)
        })
    },

    addComment () {
      axios.post('/posts/comment', this.form)
        .then(res => {
          this.form.message = ''
          this.getPost()
          this.errors = ''
          console.log(res)
        })
        .catch(err => {
          this.errors = err.response.data.error
        })
    },

    deleteComment (id) {
      if (confirm('Are you sure you want to delete this comment?')) {
        axios.patch('/posts/comment/' + this.selectedPost.message._id, { id: id })
          .then(res => {
            console.log(res)
            this.getPost()
          })
      }
    },

    likePost () {
      axios.patch('/posts/like/' + this.selectedPost.message._id)
        .then(res => {
          console.log(res)
          this.getUser()
          this.getPost()
        })
    },

    unlikePost () {
      axios.patch('/posts/unlike/' + this.selectedPost.message._id)
        .then(res => {
          console.log(res)
          this.getUser()
          this.getPost()
        })
    },

    getUser () {
      axios.get('/users/' + this.StateUser.message._id)
        .then(res => {
          this.setUser(res.data)
        })
    }
  }
}
</script>

<style>

</style>
