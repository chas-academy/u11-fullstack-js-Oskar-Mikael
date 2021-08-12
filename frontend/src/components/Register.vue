<template>
    <div>
        <h2>
            Register
        </h2>
        <form method="post" @submit.prevent="register">
            <p>
                Username
            </p>
            <input type="text" name="username" v-model="name"/>
            <p>
                Email
            </p>
            <input type="email" name="email" v-model="email"/>
            <p>
                Password
            </p>
            <input type="password" name="password" v-model="password"/>
            <p>
                Bio
            </p>
            <input type="text" name="bio" v-model="bio"/>
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
      username: '',
      email: '',
      password: '',
      bio: ''
    }
  },

  methods: {
    register () {
      axios
        .post('http://localhost:5000/api/users/register', {
          headers: {
            'Content-type': 'application/json'
          },
          body: this.username
        })
        .then((res) => {
          console.log(res)
        })
    }
  }
}

</script>

<style>

</style>
