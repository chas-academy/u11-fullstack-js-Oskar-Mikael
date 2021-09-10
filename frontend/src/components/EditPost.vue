<template>
  <div>
      <h2>
          Edit Post
      </h2>
      <form @submit.prevent="updatePost">
          <p>
              Title
          </p>
          <input type="text" v-model="form.title">
          <p v-if="editPostErrors.type === 'title'">
            {{ this.editPostErrors.message }}
          </p>
          <p>
              Body
          </p>
          <input type="text" v-model="form.body">
          <p v-if="editPostErrors.type === 'body'">
            {{ this.editPostErrors.message }}
          </p>
          <button type="submit">Edit Post</button>
      </form>
  </div>
</template>

<script>
import axios from 'axios'
import { mapGetters, mapMutations } from 'vuex'
import router from '../helpers/router.js'
export default {
  name: 'EditPost',

  computed: mapGetters(['postErrors']),

  data () {
    return {
      form: {
        title: this.$store.getters.selectedPost.message.title,
        body: this.$store.getters.selectedPost.message.body
      },
      editPostErrors: ''
    }
  },

  methods: {
    ...mapMutations(['loadingTrue', 'loadingFalse', 'setPostErrors']),

    updatePost () {
      this.loadingTrue()
      axios.patch('/posts/' + this.$store.getters.selectedPost.message._id, this.form)
        .then(res => {
          alert('Post edited successfully')
          this.editPostErrors = ''
          router.back()
          this.loadingFalse()
        })
        .catch(err => {
          console.log(err.message)
          this.loadingFalse()
          this.editPostErrors = err.response.data.error
        })
    }
  }
}
</script>

<style>

</style>
