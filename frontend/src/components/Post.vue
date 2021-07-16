<template>
    <div>
        Posts
        <p>
            {{ posts }}
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
        .get('http://localhost:5000/api/posts')
        .then((res) => {
          this.posts = res.data[0].createdAt
          console.log(res)
        })
    }
  }
}
</script>

<style>

</style>
