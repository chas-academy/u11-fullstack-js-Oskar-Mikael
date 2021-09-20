<template>
    <div class="text-center">
        <h2 class="text-3xl mb-10">
            Update User
        </h2>
        <form method="post" @submit.prevent="updateUser(_self.SelectedUser._id)">
            <input placeholder="Username" class="mb-8 text-black bg-gray-200 pl-2 md:w-1/4 w-8/12 h-10 rounded-md" type="text" name="username" v-model="form.username"/><br>
            <p class="errors" v-if="errors.type == 'username'">
                {{ errors.message }}
            </p>
            <input placeholder="Email" class="mb-8 text-black bg-gray-200 pl-2 md:w-1/4 w-8/12 h-10 rounded-md" type="email" name="email" v-model="form.email"/><br>
             <p class="errors" v-if="errors.type == 'email'">
                {{ errors.message }}
            </p>
            <input placeholder="Bio" class="mb-8 text-black bg-gray-200 pl-2 md:w-1/4 w-8/12 h-10 rounded-md" type="text" name="bio" v-model="form.bio"/><br>
            <select class="mb-8 text-black bg-gray-200 pl-2 md:w-1/4 w-8/12 h-10 rounded-md" name="country" v-model="form.country">
              <option selected>
                {{ form.country }}
              </option>
              <option v-for="country in countries" :key="country.id">
                {{ country.name }}
              </option>
            </select><br>
            <p class="errors" v-if="errors.type == 'country'">
                {{ errors.message }}
            </p>
            <button class="my-6 py-2 px-20 bg-blue-600 rounded-md" type="submit">Save</button>
        </form>
    </div>
</template>

<script>
import axios from 'axios'
import { mapGetters } from 'vuex'
export default {
  name: 'EditUser',

  computed: mapGetters(['StateUser', 'SelectedUser']),

  mounted () {
    this.getCountries()
  },

  data () {
    return {
      form: {
        username: this.$store.getters.SelectedUser.username,
        email: this.$store.getters.SelectedUser.email,
        bio: this.$store.getters.SelectedUser.bio,
        country: this.$store.getters.SelectedUser.country
      },
      errors: '',
      countries: ''
    }
  },

  methods: {
    updateUser (id) {
      axios.patch('users/admin-edit-user/' + id, this.form)
        .then(res => {
          console.log(res)
          alert('User Updated')
          this.$router.back()
        })
    },

    getCountries () {
      delete axios.defaults.headers.common.authorization
      delete axios.defaults.headers.common.isadmin
      axios.get('https://restcountries.eu/rest/v2/all')
        .then(res => {
          console.log(res)
          this.countries = res.data
          axios.defaults.headers.common.authorization = localStorage.getItem('token')
          axios.defaults.headers.common.isadmin = this.StateUser.message.isAdmin
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
