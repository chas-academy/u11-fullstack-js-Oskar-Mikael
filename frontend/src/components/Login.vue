<template>
 <div>
     <h2>
       Login
     </h2>
     <form method="post" @submit.prevent="login">
            <p>
                Email
            </p>
          <input type="email" name="email" v-model="form.email"/>
            <p>
                Password
            </p>
          <input type="password" name="password" v-model="form.password"/>
          <button type="submit">Login</button>
      </form>
        <p class="errors" v-if="this.errors">
          {{ errors }}
        </p>
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
