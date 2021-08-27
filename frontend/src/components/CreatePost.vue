<template>
  <div>
      <h2>
          Create Post
      </h2>
      <form @submit.prevent="addPost">
        <p>
          Category
        </p>
        <select v-model="form.category">
          <option hidden>
            -Select Category-
          </option>
          <option>
            Family
          </option>
          <option>
            Sports
          </option>
          <option>
            Coding
          </option>
        </select>
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
        category: '',
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
