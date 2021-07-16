<template>
  <div class="hello">
    <h1>
      Welcome to Bo Forums
    </h1>
    <h2>
      What's your name
    </h2>
    <form @submit="setName">
    <input v-model="input"/>
    <button type="submit">Go</button>
    </form>
    <p style="color:red">
      {{ myName }}
    </p>
  </div>
</template>

<script>
export default {
  name: 'Home',
  props: {
    msg: String
  },
  data () {
    return {
      myName: '',
      input: ''
    }
  },
  methods: {
    setName (e) {
      e.preventDefault()
      this.myName = this.input
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
