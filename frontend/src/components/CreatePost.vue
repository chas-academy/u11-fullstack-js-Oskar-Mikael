<template>
  <div>
      <h2>
          Create Post
      </h2>
      <form @submit.prevent="addPost">
          <p>
              Title
          </p>
          <input type="text" v-model="form.title">
          <p>
              Body
          </p>
          <input type="text" v-model="form.body">
          <button type="submit">Create Post</button>
      </form>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  name: 'CreatePost',

  data () {
    return {
      form: {
        title: '',
        body: '',
        creator: this.$store.getters.StateUser
      }
    }
  },

  methods: {
    ...mapActions(['createPost']),

    addPost () {
      this.createPost(this.form)
    }
  }
}
</script>

<style>

</style>
