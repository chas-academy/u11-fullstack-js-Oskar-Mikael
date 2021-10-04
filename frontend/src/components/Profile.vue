<template>
  <div>
    <div class="text-2xl" v-if="this.SelectedUser.message.isPrivate">
      This profile is private
    </div>
    <div v-else>
      <h2 class="text-3xl">
        Profile of {{ this.SelectedUser.message.username }}
      </h2>
      <p>Total posts: {{ userPosts.length }}</p>
      <p>Like score: {{ this.userLikeScore }}</p>
      <p class="mt-10 mb-6 text-xl">Posts</p>
      <div
        class="
          bg-gray-400
          mb-4
          text-black
          w-full
          md:w-1/2
          py-12
          pl-4
          cursor-pointer
          rounded-md
        "
        @click="postNavigate(post._id)"
        v-for="post in userPosts"
        :key="post._id"
      >
        <p class="text-2xl mb-1 font-bold">
          {{ post.title }}
        </p>
        <p class="mb-6" v-if="post.body.length >= 40">
          {{ post.body.substr(0, 40) + "..." }}
        </p>
        <p class="mb-6" v-else>
          {{ post.body }}
        </p>
        <p>
          <i class="fa fa-thumbs-up"></i>
          {{ post.likeCount }}
        </p>
        <p>
          <i class="fa fa-comments"></i>
          {{ post.comments.length }}
        </p>
        <p class="mt-6 font-bold">
          {{ post.category }}
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions, mapMutations } from 'vuex'
import axios from 'axios'
export default {
  name: 'Profile',

  computed: mapGetters(['SelectedUser']),

  data () {
    return {
      userPosts: '',
      userLikeScore: ''
    }
  },

  mounted () {
    this.getUser()
  },

  methods: {
    ...mapActions(['navigateToPost']),
    ...mapMutations(['loadingTrue', 'loadingFalse']),

    getUser () {
      this.loadingTrue()
      axios.get('posts/user/' + this.SelectedUser.message._id)
        .then(res => {
          this.userPosts = res.data.message
          console.log(res)
          const postLikes = this.userPosts.map(post => post.likeCount)
          this.userLikeScore = postLikes.reduce((a, b) => a + b)
          this.loadingFalse()
        })
        .catch(err => {
          console.log(err)
          this.loadingFalse()
        })
    },

    postNavigate (id) {
      this.navigateToPost(id)
    }
  }
}
</script>

<style>

</style>
