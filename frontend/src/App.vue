<template>
  <div class="text-white" id="app">
    <nav class="text-black navbar w-full flex justify-between bg-gray-300 absolute top-0 right-0">
       <p class="text-2xl my-auto ml-4">
      <router-link to="/">Bo Forums</router-link>
    </p>
      <ul class="md:inline-flex hidden float-right list-none">
        <li>
          <router-link to="/categories">Forum</router-link>
        </li>
        <li class="bg-blue-400 rounded-md" v-if="!this.isAuthenticated">
          <router-link to="/login">Join Now!</router-link>
        </li>
        <li v-if="this.isAuthenticated">
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
    <div class="md:hidden block">
      <i @click="toggleBurger" :class="{ 'active' : isBurgerActive }" class="fa fa-bars absolute top-5 right-5 text-3xl"></i>
    </div>
    <div class="container mx-auto mt-24">
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

  data () {
    return {
      isBurgerActive: false
    }
  },

  methods: {
    ...mapActions(['LogOut']),

    logout () {
      this.LogOut()
    },

    toggleBurger () {
      this.isBurgerActive = !this.isBurgerActive
    }
  }
}
</script>

<style>
  a {
    text-decoration: none;
    color: inherit;
  }

 .navbar > ul > li {
   padding: 0.5rem;
   margin: 1rem;
 }

 input {
   outline: none;
 }

   @import './assets/css/loading.css';
   @import './assets/css/tailwind.css';
</style>
