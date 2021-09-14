<template>
    <div>
      <div class="bg-gray-400 mb-4 text-black w-full md:w-1/2 py-12 pl-4 cursor-pointer rounded-md" v-for="post in allPosts" :key="post._id" @click="postNavigate(post._id)">
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
          By <span @click="clickUser(post.creator.message._id, $event)" class="font-bold underline hover:no-underline"> {{ post.creator.message.username }} </span>
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
      <p v-if="this.postErrors">
          {{ this.postErrors }}
        </p>
    </div>
</template>

<script>

import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'Posts',

  computed: mapGetters(['allPosts', 'postErrors']),

  data () {
    return {
      posts: '',
      selectedCategory: ''
    }
  },

  methods: {
    ...mapActions(['fetchPosts', 'fetchCategoryPosts', 'navigateToPost', 'getUser']),

    postNavigate (id) {
      this.navigateToPost(id)
    },

    clickUser (id, e) {
      e.preventDefault()
      e.stopPropagation()
      this.getUser(id)
    },

    selectCategory () {
      this.fetchCategoryPosts(this.selectedCategory)
    }
  }

}
</script>

<style>

</style>
