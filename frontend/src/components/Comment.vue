<template>
  <div>
    {{ comment.message }}

    <p @click='onClickEdit'>Edit comment</p>

    <form v-if='editing' @submit.prevent='editComment'>
      <input type='text' v-model='updatedCommentMessage' />

      <button type='submit'>Edit Comment</button>
    </form>
    <p @click="deleteComment(comment._id)">
          Delete Comment
        </p>
  </div>
</template>

<script>
import axios from 'axios'
import { mapGetters, mapMutations } from 'vuex'
export default {
  name: 'Comment',

  computed: mapGetters(['selectedPost']),

  props: {
    comment: {
      type: Object
    }
  },

  data () {
    return {
      editing: false,
      updatedCommentMessage: ''
    }
  },

  methods: {
    ...mapMutations(['setSelectedPost']),

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
    },

    deleteComment (id) {
      if (confirm('Are you sure you want to delete this comment?')) {
        axios.patch('/posts/comment/' + this.selectedPost.message._id, { id: id })
          .then(res => {
            console.log(res)
            this.getPost()
          })
      }
    }
  }
}
</script>
