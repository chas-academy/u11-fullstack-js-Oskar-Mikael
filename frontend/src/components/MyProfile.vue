<template>
  <div>
    <h2 class="text-3xl">
      {{ this.StateUser.message.username }}
    </h2>
    <p class="my-8">
      {{ this.StateUser.message.bio }}
    </p>
    <p>Total posts: {{ this.posts.length }}</p>
    <p>Like score: {{ this.userLikeScore }}</p>
    <div class="grid md:grid-cols-2 grid-cols-1">
      <div>
        <h3 class="mt-10 mb-6 text-2xl">Posts</h3>
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
          v-for="post in posts"
          :key="post._id"
          @click="postNavigate(post._id)"
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
      <div class="justify-end">
        <h3 class="mt-12 text-2xl mb-6">Settings</h3>
        <div class="flex mb-6">
          <p class="text-lg mr-2">Private Profile</p>
          <form
            class="mt-1"
            v-if="!this.StateUser.message.isPrivate"
            @change="privateTrue($store.getters.StateUser.message._id)"
          >
            <input type="checkbox" />
          </form>
          <form
            class="mt-1"
            v-else
            @change="privateFalse($store.getters.StateUser.message._id)"
          >
            <input type="checkbox" checked />
          </form>
        </div>
        <p class="mb-2">Update password</p>
        <form @submit.prevent="updatePassword">
          <input
            class="pl-2 md:w-1/2 w-8/12 h-8 mb-2 text-black rounded-md"
            type="password"
            v-model="passwordForm.newPassword"
          /><br />
          <button class="py-1 px-2 bg-blue-500 rounded-md" type="submit">
            Save
          </button>
        </form>
        <div class="mt-10">
          <p class="text-xl mb-4">Edit Profile</p>
          <form
            method="post"
            @submit.prevent="
              updateUser(_self.$store.getters.StateUser.message._id)
            "
          >
            <textarea
              placeholder="Bio"
              class="
                mb-8
                text-black
                bg-gray-200
                pl-2
                md:w-1/2
                w-8/12
                h-32
                rounded-md
              "
              type="text"
              name="bio"
              v-model="form.bio"
            /><br />
            <select
              class="
                mb-2
                text-black
                bg-gray-200
                pl-2
                md:w-1/2
                w-8/12
                h-10
                rounded-md
              "
              name="country"
              v-model="form.country"
            >
              <option selected>
                {{ form.country }}
              </option>
              <option v-for="country in countries" :key="country">
                {{ country }}
              </option>
            </select>
            <br />
            <p class="errors" v-if="errors.type == 'country'">
              {{ errors.message }}
            </p>
            <button class="py-1 px-2 bg-blue-500 rounded-md" type="submit">
              Save
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions, mapMutations } from 'vuex'
import axios from 'axios'
import countryList from '../helpers/countries'
export default {
  name: 'MyProfile',

  data () {
    return {
      passwordForm: {
        newPassword: ''
      },
      form: {
        bio: this.$store.getters.StateUser.message.bio,
        country: this.$store.getters.StateUser.message.country
      },
      errors: '',
      countries: countryList,
      posts: '',
      userLikeScore: ''
    }
  },

  mounted () {
    this.getUserPosts()
    this.getUser()
  },

  computed: mapGetters(['StateUser']),

  methods: {
    ...mapActions(['navigateToPost']),
    ...mapMutations(['loadingTrue', 'loadingFalse']),

    updatePassword () {
      this.loadingTrue()
      axios.patch('/users/change-password', this.passwordForm)
        .then(res => {
          console.log(res)
          this.loadingFalse()
          alert(res.data.message)
          this.passwordForm.newPassword = ''
        })
        .catch(err => {
          console.log(err)
          alert(err.response.data.message)
          this.loadingFalse()
        })
    },

    getUserPosts () {
      this.loadingTrue()
      axios.get('/posts/user/' + this.StateUser.message._id)
        .then(res => {
          this.posts = res.data.message
          console.log(res)
          this.loadingFalse()
          const postLikes = this.posts.map(post => post.likeCount)
          this.userLikeScore = postLikes.reduce((a, b) => a + b)
        })
        .catch(err => {
          console.log(err)
          this.loadingFalse()
        })
    },

    postNavigate (id) {
      this.navigateToPost(id)
    },

    getUser () {
      this.loadingTrue()
      axios.get('/users/' + this.StateUser.message._id)
        .then(res => {
          this.$store.commit('setUser', res.data)
          console.log(res)
          this.loadingFalse()
        })
        .catch(err => {
          console.log(err)
          this.loadingFalse()
        })
    },

    privateTrue (id) {
      this.loadingTrue()
      axios.patch('/users/private-true/' + id)
        .then(res => {
          console.log(res)
          this.loadingFalse()
        })
        .catch(err => {
          console.log(err)
          this.loadingFalse()
        })
    },

    privateFalse (id) {
      this.loadingTrue()
      axios.patch('/users/private-false/' + id)
        .then(res => {
          console.log(res)
          this.loadingFalse()
        })
        .catch(err => {
          console.log(err)
          this.loadingFalse()
        })
    },

    updateUser (id) {
      console.log(id)
      axios.patch('/users/edit-user/' + id, this.form)
        .then(res => {
          console.log(res)
          alert('Profile Updated')
          this.getUser()
          this.loadingFalse()
        })
        .catch(err => {
          console.log(err)
          this.loadingFalse()
        })
    }
  }
}
</script>

<style>

</style>
