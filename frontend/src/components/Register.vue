<template>
    <div class="text-center">
    <h2 class="text-2xl mt-32 my-20">Register</h2>
    <form method="post" @submit.prevent="register">
      <input
        placeholder="Username *"
        class="my-8 text-black bg-gray-200 pl-2 md:w-1/4 w-8/12 h-10 rounded-md"
        type="text"
        name="username"
        v-model="form.username"
      /><br />
      <p class="errors" v-if="errors.type == 'username'">
        <br />
        {{ errors.message }}
      </p>
      <input
        placeholder="Email *"
        class="my-8 text-black bg-gray-200 pl-2 md:w-1/4 w-8/12 h-10 rounded-md"
        type="email"
        name="email"
        v-model="form.email"
      /><br />
      <p class="errors" v-if="errors.type == 'email'">
        {{ errors.message }}
      </p>
      <input
        placeholder="Password *"
        class="my-8 text-black bg-gray-200 pl-2 md:w-1/4 w-8/12 h-10 rounded-md"
        type="password"
        name="password"
        v-model="form.password"
      /><br />
      <p class="errors" v-if="errors.type == 'password'">
        {{ errors.message }}
      </p>
      <input
        placeholder="Bio"
        class="my-8 text-black bg-gray-200 pl-2 md:w-1/4 w-8/12 h-10 rounded-md"
        type="text"
        name="bio"
        v-model="form.bio"
      /><br />
      <select
        class="my-8 text-black bg-gray-200 pl-2 md:w-1/4 w-8/12 h-10 rounded-md"
        name="country"
        v-model="form.country"
      >
        <option hidden value="">-Select Country- *</option>
        <option v-for="country in countries" :key="country">
          {{ country }}
        </option></select
      ><br />
      <p class="errors" v-if="errors.type == 'country'">
        {{ errors.message }}
      </p>
      <button class="my-6 py-2 px-20 bg-green-600 rounded-md" type="submit">
        Register
      </button>
    </form>
  </div>
</template>

<script>
import axios from 'axios'
import { mapGetters, mapMutations } from 'vuex'
import countryList from '../helpers/countries'
export default {
  name: 'Register',

  computed: mapGetters(['StateUser']),

  mounted () {
    this.errors = ''
  },

  data () {
    return {
      form: {
        username: '',
        email: '',
        password: '',
        bio: '',
        country: ''
      },
      errors: '',
      countries: countryList
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
    }
  }
}

</script>

<style>
.errors {
    color: red;
  }

</style>
