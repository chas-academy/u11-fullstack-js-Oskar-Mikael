<template>
  <div class="text-center">
      <h2 class="text-3xl mb-10">
          Create Post
      </h2>
      <form @submit.prevent="addPost">
        <select class="mb-8 text-black bg-gray-200 pl-2 w-1/4 h-10 rounded-md"  v-model="form.category">
          <option selected value=''>
            -Select category-
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
        </select><br>
        <p v-if="this.postErrors && this.postErrors.type === 'category'">
            {{ this.postErrors.message }}
          </p>
          <input placeholder="Title" class="mb-8 text-black bg-gray-200 pl-2 w-1/4 h-10 rounded-md"  type="text" v-model="form.title"><br>
          <p v-if="this.postErrors && this.postErrors.type === 'title'">
            {{ this.postErrors.message }}
          </p>
          <textarea placeholder="Body" class="mb-8 text-black bg-gray-200 pl-2 w-1/2 h-72 rounded-md"  type="text" v-model="form.body"/><br>
          <p v-if="this.postErrors && this.postErrors.type === 'body'">
            {{ this.postErrors.message }}
          </p>
          <button class="my-6 py-2 px-20 bg-green-600 rounded-md" type="submit">Create Post</button>
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
