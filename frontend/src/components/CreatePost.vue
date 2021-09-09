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
        <p v-if="this.postErrors && this.postErrors.type === 'category'">
            {{ this.postErrors.message }}
          </p>
          <p>
              Title
          </p>
          <input type="text" v-model="form.title">
          <p v-if="this.postErrors && this.postErrors.type === 'title'">
            {{ this.postErrors.message }}
          </p>
          <p>
              Body
          </p>
          <input type="text" v-model="form.body">
          <p v-if="this.postErrors && this.postErrors.type === 'body'">
            {{ this.postErrors.message }}
          </p>
          <button type="submit">Create Post</button>
      </form>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
export default {
  name: 'CreatePost',

  computed: mapGetters(['postErrors']),

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
