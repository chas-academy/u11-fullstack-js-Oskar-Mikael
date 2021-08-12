<template>
    <div>
        <h2>
            Register
        </h2>
        <form method="post" @submit.prevent="register">
            <p>
                Username
            </p>
            <input type="text" name="username" v-model="form.username"/>
            <p class="errors" v-if="errors.type == 'username'">
                {{ errors.message }}
            </p>
            <p>
                Email
            </p>
            <input type="email" name="email" v-model="form.email"/>
             <p class="errors" v-if="errors.type == 'email'">
                {{ errors.message }}
            </p>
            <p>
                Password
            </p>
            <input type="password" name="password" v-model="form.password"/>
             <p class="errors" v-if="errors.type == 'password'">
                {{ errors.message }}
            </p>
            <p>
                Bio
            </p>
            <input type="text" name="bio" v-model="form.bio"/>
            <button type="submit">Register</button>
        </form>
    </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'Register',

  data () {
    return {
      form: {
        username: '',
        email: '',
        password: '',
        bio: ''
      },
      errors: ''
    }
  },

  methods: {
    register () {
      axios
        .post('/users/register', this.form)
        .then((res) => {
          console.log(res)
          if (res.status === 201) {
            this.$router.push('/login')
          }
        })
        .catch((err) => {
          this.errors = err.response.data.error
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
