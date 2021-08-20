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
      <p v-if="this.selectedPost.message.creator.message._id === this.StateUser.message._id || this.StateUser.message.isAdmin" @click="deletePost">
          Delete post
      </p>
       <p>
          Comment
        </p>
      <form @submit.prevent="addComment">
        <input type="text" v-model="form.message">
        <button type="submit">Add Comment</button>
      </form>
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

  computed: mapGetters(['selectedPost', 'StateUser']),

  data () {
    return {
      form: {
        message: '',
        id: this.$store.getters.selectedPost.message._id
      }
    }
  },

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
          console.log(res.data)
        })
    },

    addComment () {
      axios.post('/posts/comment', this.form)
        .then(res => {
          alert('Comment added')
          this.form.message = ''
          this.getPost()
          console.log(res)
        })
    },

    deleteComment (id) {
      if (confirm('Are you sure you want to delete this post?')) {
        axios.patch('/posts/comment/' + this.selectedPost.message._id, id)
          .then(res => {
            console.log(res)
          })
      }
    }
  }
}
</script>

<style>

</style>
