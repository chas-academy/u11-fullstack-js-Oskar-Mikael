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
          <p>
              Body
          </p>
          <input type="text" v-model="form.body">
          <button type="submit">Edit Post</button>
      </form>
  </div>
</template>

<script>
import axios from 'axios'
import router from '../helpers/router.js'
import { mapMutations } from 'vuex'
export default {
  name: 'EditPost',

  data () {
    return {
      form: {
        title: this.$store.getters.selectedPost.message.title,
        body: this.$store.getters.selectedPost.message.body
      }
    }
  },

  methods: {
    ...mapMutations(['loadingTrue', 'loadingFalse']),

    updatePost () {
      this.loadingTrue()
      axios.patch('/posts/' + this.$store.getters.selectedPost.message._id, this.form)
        .then(res => {
          alert(res.data.message)
          router.back()
          this.loadingFalse()
        })
        .catch(err => {
          console.log(err.message)
          this.loadingFalse()
        })
    }
  }
}
</script>

<style>

</style>
