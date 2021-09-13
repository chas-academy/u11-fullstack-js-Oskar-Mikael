<template>
 <div class="text-center">
     <h2 class="text-2xl mt-32 mb-20">
       Login
     </h2>
     <form method="post" @submit.prevent="login">
          <input class="mb-8 text-black bg-gray-200 pl-2 w-1/4 h-10 rounded-md" placeholder="Email" type="email" name="email" v-model="form.email"/><br>
          <input class="bg-gray-200 text-black pl-2 w-1/4 h-10 rounded-md" placeholder="Password" type="password" name="password" v-model="form.password"/><br>
          <p class="errors mt-4" v-if="this.errors">
          {{ errors }}
        </p>
          <button class="my-6 py-2 px-20 bg-blue-600 rounded-md" type="submit">Login</button>
      </form>

     <h4>
       <router-link to="/register">
       Not registered?
       </router-link>
     </h4>
 </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
export default {
  name: 'Login',

  computed: mapGetters(['errors']),

  data () {
    return {
      form: {
        email: '',
        password: ''
      }
    }
  },

  methods: {
    ...mapActions(['LogIn']),
    login () {
      this.LogIn(this.form)
    }
  }
}
</script>

<style>
  .errors {
    color: red;
  }

</style>
