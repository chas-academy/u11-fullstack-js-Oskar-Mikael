<template>
  <div class="text-center">
    <h2 class="text-3xl mb-10">Edit Post</h2>
    <form @submit.prevent="updatePost">
      <input
        placeholder="Title"
        class="text-black bg-gray-200 pl-2 md:w-1/4 w-8/12 h-10 rounded-md"
        type="text"
        v-model="form.title"
      /><br />
      <p class="text-red-600 mt-2" v-if="editPostErrors.type === 'title'">
        {{ this.editPostErrors.message }}
      </p>
      <textarea
        placeholder="Body"
        class="mt-8 text-black bg-gray-200 pl-2 md:w-1/2 w-full h-72 rounded-md"
        type="text"
        v-model="form.body"
      /><br />
      <p class="text-red-600 mt-2" v-if="editPostErrors.type === 'body'">
        {{ this.editPostErrors.message }}
      </p>
      <button class="my-6 py-2 px-20 bg-blue-600 rounded-md" type="submit">
        Save
      </button>
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
