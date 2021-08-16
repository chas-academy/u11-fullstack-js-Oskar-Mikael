<template>
  <div id="app">
    <nav>
      <ul class="navbar">
        <li>
          <router-link to="/">Home</router-link>
        </li>
        <li>
          <router-link to="/posts">Posts</router-link>
        </li>
        <li v-if="!this.isAuthenticated">
          <router-link to="/login">Login</router-link>
        </li>
        <li v-if="this.isAuthenticated">
          <router-link to="/my-profile">Profile</router-link>
        </li>
        <li v-if="this.isAuthenticated" @click="logout">
          <router-link to="/login">Logout</router-link>
        </li>
        <li v-if="this.isAuthenticated && this.StateUser.message.isAdmin">
          <router-link to="/admin">Admin</router-link>
        </li>
      </ul>
    </nav>
    <div class="container">
      <router-view/>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
export default {
  name: 'App',

  computed: {
    ...mapGetters(['isAuthenticated']),
    ...mapGetters(['StateUser'])
  },

  methods: {
    ...mapActions(['LogOut']),
    logout () {
      this.LogOut()
    }
  }
}
</script>

<style>
  a {
    text-decoration: none;
    color: inherit;
  }

  .container {
    margin: 0 auto;
    max-width: 1140px;
  }

 .navbar {
   display: inline-flex;
   float: right;
   list-style-type: none;
 }

 .navbar > li {
   padding: 1.4rem;
 }
</style>
