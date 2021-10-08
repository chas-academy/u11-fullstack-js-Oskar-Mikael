<template>
  <div>
    <h2 class="text-3xl mb-8">
      {{ this.selectedPost.message.title }}
    </h2>
    <nl2br
      class="text-xl mb-4"
      tag="p"
      :text="this.selectedPost.message.body"
    />
    <hr class="my-10" />
    <p class="mb-4">
      Posted by
      <span
        @click="clickUser"
        class="
          font-bold
          text-blue-500
          underline
          hover:no-underline
          cursor-pointer
        "
        >{{ this.selectedPost.message.creator.message.username }}</span
      >
    </p>
    <p>{{ this.selectedPost.message.likeCount }} likes</p>
    <p
      v-if="
        !this.StateUser.message.likedPosts.includes(
          this.selectedPost.message._id
        ) && this.isAuthenticated
      "
      @click="likePost"
    >
      <i class="fa fa-thumbs-o-up cursor-pointer text-2xl"></i>
    </p>
    <p v-else-if="this.isAuthenticated" @click="unlikePost">
      <i class="fa fa-thumbs-up cursor-pointer text-2xl"></i>
    </p>
    <p class="mt-6 mb-10 font-bold">
      {{ this.selectedPost.message.category }}
    </p>
    <p
      v-if="
        this.selectedPost.message.creator.message._id ===
          this.StateUser.message._id || this.StateUser.message.isAdmin
      "
    >
      <span
        class="cursor-pointer mr-4 text-black bg-blue-400 py-1 px-2 rounded-sm"
        @click="postNavigate"
      >
        Edit post
      </span>
      <span
        class="cursor-pointer text-black bg-red-400 py-1 px-2 rounded-sm"
        @click="deletePost"
      >
        Delete post
      </span>
    </p>
    <h3 class="text-2xl my-10">
      {{ this.selectedPost.message.comments.length }} Comments
    </h3>
    <div v-if="this.isAuthenticated" class="mt-20 mb-8">
      <p class="mb-2">Add Comment</p>
      <form @submit.prevent="addComment">
        <textarea
          class="md:w-1/4 w-1/2 h-24 rounded-md text-black pl-2"
          type="text"
          v-model="form.message"
        /><br />
        <p v-if="this.errors">
          {{ errors }}
        </p>
        <button
          class="mt-4 bg-green-400 rounded-md text-black py-1 px-2"
          type="submit"
        >
          Add Comment
        </button>
      </form>
    </div>
    <div v-else class="mb-8">
      <p>
        <router-link to="/login" class="font-bold underline hover:no-underline"
          >Login</router-link
        >
        or
        <router-link
          to="/register"
          class="font-bold underline hover:no-underline"
          >Register</router-link
        >
        to comment
      </p>
    </div>
    <comment
      class="mt-6 mb-12"
      v-for="comment in this.selectedPost.message.comments"
      :key="comment._id"
      :comment="comment"
      @on-update="updateComment"
    />
  </div>
</template>

<script>
import { mapGetters, mapActions, mapMutations } from 'vuex'
import axios from 'axios'
import router from '../helpers/router.js'
import Comment from './Comment.vue'
import nl2br from 'vue-nl2br'
export default {
  name: 'Post',

  components: { Comment, nl2br },

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
    this.getCurrentUser()
  },

  methods: {
    ...mapActions(['getUser', 'navigateToEditPost']),
    ...mapMutations(['setSelectedPost', 'setUser', 'loadingTrue', 'loadingFalse']),

    clickUser () {
      this.getUser(this.selectedPost.message.creator.message._id)
    },

    postNavigate () {
      this.navigateToEditPost(this.selectedPost.message._id)
    },

    deletePost (id) {
      if (confirm('Are you sure you want to delete this post?')) {
        this.loadingTrue()
        axios.delete('/posts/' + this.selectedPost.message._id, id)
          .then(res => {
            router.back()
            console.log(res)
            this.loadingFalse()
          })
          .catch(err => {
            console.log(err)
            this.loadingFalse()
          })
      }
    },

    getPost () {
      this.loadingTrue()
      axios.get('/posts/' + this.$route.params.id)
        .then(res => {
          this.setSelectedPost(res.data)
          console.log(res.data)
          this.loadingFalse()
        })
        .catch(err => {
          console.log(err)
          this.loadingFalse()
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

    likePost () {
      axios.patch('/posts/like/' + this.selectedPost.message._id)
        .then(res => {
          console.log(res)
          this.getCurrentUser()
          this.getPost()
        })
        .catch(err => {
          console.log(err)
          this.loadingFalse()
        })
    },

    unlikePost () {
      axios.patch('/posts/unlike/' + this.selectedPost.message._id)
        .then(res => {
          console.log(res)
          this.getCurrentUser()
          this.getPost()
        })
        .catch(err => {
          console.log(err)
          this.loadingFalse()
        })
    },

    getCurrentUser () {
      axios.get('/users/' + this.StateUser.message._id)
        .then(res => {
          this.setUser(res.data)
        })
        .catch(err => {
          console.log(err)
          this.loadingFalse()
        })
    },

    updateComment (id, comment) {
      axios.patch('/posts/edit-comment/' + this.selectedPost.message._id, {
        id: id
      })
        .then(res => {
          console.log(res)
          this.edit = ''
          this.getPost()
        })
        .catch(err => {
          console.log(err)
        })
      console.log(id)
    }
  }
}
</script>

<style>

</style>
