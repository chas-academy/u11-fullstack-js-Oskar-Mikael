<template>
  <div @click="documentClick" class="w-4/5 comment">
    <p @click="clickUser(comment.creator._id)" class="font-bold text-blue-500 underline hover:no-underline cursor-pointer w-1/6">
      {{ comment.creator.username }}
    </p>
    <p class="ml-2 mt-2">
    {{ comment.message }}
    </p>
    <form v-if='editing' @submit.prevent='editComment'>
      <input class="w-1/4 h-8 rounded-md text-black pl-2" type='text' v-model='updatedCommentMessage' />

      <button class="ml-2 bg-blue-500 py-1 px-2 rounded-md" type='submit'>Save</button>
    </form>
        <i v-if="this.StateUser.message._id === comment.creator._id" @click.stop="commentOptions = !commentOptions" class="fa fa-ellipsis-v float-right cursor-pointer"></i>
        <div v-if="commentOptions" class="bg-gray-400 float-right mr-2 text-black text-center">
          <p v-if="this.StateUser.message._id === comment.creator._id" class="hover:bg-gray-300 cursor-pointer p-1" @click='onClickEdit'>Edit comment</p>
          <p v-if="this.StateUser.message._id === comment.creator._id" class="hover:bg-gray-300 cursor-pointer p-1" @click="deleteComment(comment._id)">
          Delete Comment
        </p>
        </div>
        <hr class="mt-6">
  </div>
</template>

<script>
import axios from 'axios'
import { mapGetters, mapMutations, mapActions } from 'vuex'
export default {
  name: 'Comment',

  computed: mapGetters(['selectedPost', 'StateUser']),

  props: {
    comment: {
      type: Object
    }
  },

  mounted () {
    document.addEventListener('click', this.documentClick())
  },

  beforeDestroy () {
    document.addEventListener('click', this.documentClick())
  },

  data () {
    return {
      editing: false,
      updatedCommentMessage: '',
      commentOptions: false
    }
  },

  methods: {
    ...mapMutations(['setSelectedPost']),
    ...mapActions(['getUser']),

    documentClick () {
      this.commentOptions = false
    },

    clickUser (id) {
      this.getUser(id)
    },

    onClickEdit () {
      this.editing = true
      this.updatedCommentMessage = this.comment.message
    },

    editComment () {
      this.$emit('on-update', {
        id: this.comment._id,
        comment: this.updatedCommentMessage
      })
      this.editing = false
    },

    getPost () {
      axios.get('/posts/' + this.$route.params.id)
        .then(res => {
          this.setSelectedPost(res.data)
          console.log(res.data)
        })
        .catch(err => {
          console.log(err)
          this.loadingFalse()
        })
    },

    deleteComment (id) {
      if (confirm('Are you sure you want to delete this comment?')) {
        axios.patch('/posts/comment/' + this.selectedPost.message._id, { id: id })
          .then(res => {
            console.log(res)
            this.getPost()
          })
          .catch(err => {
            console.log(err)
            this.loadingFalse()
          })
      }
    }
  }
}
</script>
