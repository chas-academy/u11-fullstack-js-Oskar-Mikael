<template>
  <div>
      Admin Panel
      <div>
        Users
        <p v-for="post in allPosts" :key="post._id">
            {{ post.username }}
        </p>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'Admin',

  computed: mapGetters(['allPosts'])
}
</script>

<style>

</style>
