<template>
    <div>
        Users
        <p v-for="post in posts" :key="post._id">
            {{ post._id }}
        </p>
    </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'Posts',

  mounted () {
    this.getPosts()
  },

  data () {
    return {
      posts: ''
    }
  },

  methods: {
    getPosts () {
      axios
        .get('http://localhost:5000/api/users/allusers')
        .then((res) => {
          this.posts = res.data
          console.log(res)
        })
    }
  }
}
</script>

<style>

</style>
