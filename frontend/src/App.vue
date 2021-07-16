<template>
  <div id="app">
    <Home/>
    <Post/>
  </div>
</template>

<script>
import Home from './components/Home.vue'
import Post from './components/Post.vue'

export default {
  name: 'App',
  components: {
    Home,
    Post
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
