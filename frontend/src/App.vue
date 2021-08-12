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
        <li>
          <router-link to="/login">Profile</router-link>
        </li>
        <li>
          <router-link to="/login">Login</router-link>
        </li>
      </ul>
    </nav>
    <div class="container">
      <router-view/>
    </div>
  </div>
</template>

<script>

export default {
  name: 'App'
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
