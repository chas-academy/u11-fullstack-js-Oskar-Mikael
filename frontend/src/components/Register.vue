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
            <p>
              Country
            </p>
            <select name="country">
              <option hidden value=''>
                -Select Country-
              </option>
              <option v-for="country in countries" :key="country.id">
                {{ country.name }}
              </option>
            </select>
            <p class="errors" v-if="errors.type == 'country'">
                {{ errors.message }}
            </p>
            <button type="submit">Register</button>
        </form>
    </div>
</template>

<script>
import axios from 'axios'
import { mapMutations } from 'vuex'
export default {
  name: 'Register',

  mounted () {
    this.getCountries()
  },

  data () {
    return {
      form: {
        username: '',
        email: '',
        password: '',
        bio: ''
      },
      errors: '',
      countries: ''
    }
  },

  methods: {
    ...mapMutations(['loadingTrue', 'loadingFalse']),

    register () {
      this.loadingTrue()
      axios.post('/users/register', this.form)
        .then((res) => {
          console.log(res)
          if (res.status === 201) {
            this.$router.push('/login')
          }
          this.loadingFalse()
        })
        .catch((err) => {
          this.errors = err.response.data.error
          console.log(err.response)
          this.loadingFalse()
        })
    },

    getCountries () {
      delete axios.defaults.headers.common.authorization
      axios.get('https://restcountries.eu/rest/v2/all')
        .then(res => {
          console.log(res)
          this.countries = res.data
          axios.defaults.headers.common.authorization = localStorage.getItem('token')
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
