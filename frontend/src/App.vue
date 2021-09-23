<template>
  <div class="text-white" id="app">
    <nav class="text-black navbar w-full flex justify-between bg-gray-300 absolute top-0 md:h-18 min-h-30 right-0 z-0">
       <p class="text-2xl my-auto ml-4">
      <router-link to="/"><span class="font-bold">Bo</span> Forums</router-link>
    </p>
      <ul class="md:inline-flex hidden md:float-right list-none">
        <li class="bg-gray-400 text-white font-bold rounded-md">
          <router-link to="/categories">Forum</router-link>
        </li>
        <li class="bg-blue-400 rounded-md" v-if="!this.isAuthenticated">
          <router-link to="/login">Join Now!</router-link>
        </li>
        <li class="bg-green-400 rounded-md" v-if="this.isAuthenticated">
          <router-link to="/create-post">
          Create Post
          </router-link>
        </li>
        <li class="bg-blue-400 rounded-md" v-if="this.isAuthenticated">
          <router-link to="/my-profile">Profile</router-link>
        </li>
        <li class="bg-yellow-300 rounded-md" v-if="this.isAuthenticated && this.StateUser.message.isAdmin">
          <router-link to="/admin">Admin</router-link>
        </li>
        <li class="bg-red-400 rounded-md" v-if="this.isAuthenticated" @click="logout">
          <router-link to="/login">Logout</router-link>
        </li>
      </ul>
      <ul class="md:hidden inline-flex float-right">
        <li class="bg-red-400 rounded-md" v-if="this.isAuthenticated" @click="logout">
          <router-link to="/login">Logout</router-link>
        </li>
      </ul>
    </nav>
    <div class="mobile-nav text-black md:hidden block fixed bottom-0 w-full bg-gray-300">
        <ul class="flex list-none justify-center my-2 text-sm">
        <li class="bg-gray-400 text-white font-bold rounded-md">
          <router-link to="/categories">
          <i class="fa fa-comments flex justify-center text-2xl"></i>
          Forum
          </router-link>
        </li>
        <li class="bg-blue-400 rounded-md" v-if="!this.isAuthenticated">
          <router-link to="/login"><i class="fa fa-sign-in flex justify-center text-2xl"></i>
          Join Now!
          </router-link>
        </li>
        <li class="bg-green-400 rounded-md" v-if="this.isAuthenticated">
          <router-link to="/create-post">
          <i class="fa fa-plus-square flex justify-center text-2xl"></i>
          Create Post
          </router-link>
        </li>
        <li class="bg-blue-400 rounded-md" v-if="this.isAuthenticated">
          <router-link to="/my-profile">
          <i class="fa fa-user flex justify-center text-2xl"></i>
          Profile
          </router-link>
        </li>
        <li class="bg-yellow-300 rounded-md" v-if="this.isAuthenticated && this.StateUser.message.isAdmin">
          <router-link to="/admin">
          <i class="fa fa-shield flex justify-center text-2xl"></i>
          Admin
          </router-link>
        </li>
      </ul>
      </div>
    <div class="container mx-auto mt-24 mb-48 px-4">
      <router-view/>
    </div>
    <Loading />
  </div>
</template>

<script>
import { mapGetters, mapActions, mapMutations } from 'vuex'
import Loading from './components/Loading.vue'
export default {
  name: 'App',

  components: { Loading },

  computed: {
    ...mapGetters(['isAuthenticated', 'StateUser', 'isLoading'])
  },

  mounted () {
    window.addEventListener('resize', this.onResize)
    this.loadingFalse()
  },

  beforeDestroy () {
    window.addEventListener('resize', this.onResize)
  },

  data () {
    return {
      isBurgerActive: false,
      windowWidth: window.innerWidth
    }
  },

  methods: {
    ...mapMutations(['loadingFalse']),
    ...mapActions(['LogOut']),

    logout () {
      this.LogOut()
    },

    toggleBurger () {
      this.isBurgerActive = !this.isBurgerActive
    },

    onResize () {
      this.windowWidth = window.innerWidth
      if (this.windowWidth > 767) {
        this.isBurgerActive = false
      }
    }
  }
}
</script>

<style>
  a {
    text-decoration: none;
    color: inherit;
  }

  .navbar {
    min-height: 4rem;
  }

 .navbar > ul > li {
   padding: 0.5rem;
   margin: 1rem;
 }

 .mobile-nav > ul > li {
   padding: 0.5rem 0.1rem;
   margin: 0 1rem;
   min-width: 3rem;
   text-align: center;
 }

 input {
   outline: none;
 }

 textarea {
   outline: none;
   resize: none!important;
 }

   @import './assets/css/loading.css';
   @import './assets/css/tailwind.css';
</style>
