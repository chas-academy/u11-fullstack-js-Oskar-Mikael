<template>
  <div>
      <h2>
          {{ this.selectedPost.message.title }}
      </h2>
      <p>
          {{ this.selectedPost.message.body }}
      </p>
      <p>
          Posted by <span @click="clickUser">{{ this.selectedPost.message.creator.message.username }}</span>
      </p>
      <p v-if="this.selectedPost.message.creator.message._id === this.StateUser.message._id">
          Edit post
      </p>
      <p v-if="this.selectedPost.message.creator.message._id === this.StateUser.message._id">
          Delete post
      </p>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
export default {
  name: 'Post',

  computed: mapGetters(['selectedPost', 'StateUser']),

  methods: {
    ...mapActions(['getUser']),

    clickUser () {
      this.getUser(this.selectedPost.message.creator.message._id)
    }
  }
}
</script>

<style>

</style>
