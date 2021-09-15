<template>
  <div class="text-white" id="app">
    <nav class="text-black navbar w-full md:flex justify-between bg-gray-300 absolute top-0 md:h-18 min-h-30 right-0 z-0">
       <p class="text-2xl my-auto ml-4">
      <router-link to="/"><span class="font-bold">Bo</span> Forums</router-link>
    </p>
      <ul :class="{ 'showNav' : isBurgerActive }" class="md:inline-flex hidden md:float-right list-none">
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
    </nav>
    <div @click="toggleBurger" :class="{ 'change' : isBurgerActive }" class="md:hidden block burger">
      <div class="bar1"></div>
      <div class="bar2"></div>
      <div class="bar3"></div>
    </div>
    <div class="container md:mx-auto my-24 mx-4">
      <router-view/>
    </div>
    <Loading />
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import Loading from './components/Loading.vue'
export default {
  name: 'App',

  components: { Loading },

  computed: {
    ...mapGetters(['isAuthenticated']),
    ...mapGetters(['StateUser'])
  },

  mounted () {
    window.addEventListener('resize', this.onResize)
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

 input {
   outline: none;
 }

 textarea {
   outline: none;
   resize: none!important;
 }

 .burger {
   position: absolute;
   top: 2%;
   right: 2%
 }

 .bar1, .bar2, .bar3 {
  width: 35px;
  height: 5px;
  background-color: rgb(0, 0, 0);
  margin: 6px 0;
  transition: 0.4s;
}

.change .bar1 {
  -webkit-transform: rotate(-45deg) translate(-9px, 6px);
  transform: rotate(-45deg) translate(-9px, 6px);
}

.change .bar2 {opacity: 0;}

.change .bar3 {
  -webkit-transform: rotate(45deg) translate(-8px, -8px);
  transform: rotate(45deg) translate(-8px, -8px);
}

 .showNav {
   display: block!important;
   text-align: center;
   margin: 2rem auto 0 auto;
   justify-content: center;
   align-items: center;
   width: 40%;
 }

   @import './assets/css/loading.css';
   @import './assets/css/tailwind.css';
</style>
