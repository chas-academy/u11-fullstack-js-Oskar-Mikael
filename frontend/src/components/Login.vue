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
        <p class="errors" v-if="errors">
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
import axios from 'axios'
export default {
  name: 'Login',

  data () {
    return {
      form: {
        email: '',
        password: ''
      },
      errors: ''
    }
  },

  methods: {
    login () {
      axios
        .post('http://localhost:5000/api/users/login', this.form)
        .then((res) => {
          console.log(res)
          localStorage.setItem('token', res.data.token)
          alert('Welcome ' + res.data.message.username)
        })
        .catch((err) => {
          this.errors = err.response.data.message
          console.log(err.response)
        })
    }
  }
}
</script>

<style>
  .errors {
    color: red;
  }

</style>
