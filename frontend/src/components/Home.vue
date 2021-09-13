<template>
  <div class="text-center mt-32">
    <h1 class="text-5xl mb-10">
      Welcome to Bo Forums
    </h1>
    <h2 class="text-xl mb-20">
      Your home for everyday discussions and debate
    </h2>
    <router-link class="bg-green-400 py-4 px-8 rounded-md text-lg hover:bg-green-300" to="/categories">Start browsing posts</router-link>
  </div>
</template>

<script>
export default {
  name: 'Home'
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
