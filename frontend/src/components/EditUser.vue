<template>
    <div>
        <h2>
            Update User
        </h2>
        <form method="post" @submit.prevent="updateUser(_self.SelectedUser._id)">
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
            <select name="country" v-model="form.country">
              <option selected>
                {{ form.country }}
              </option>
              <option v-for="country in countries" :key="country.id">
                {{ country.name }}
              </option>
            </select>
            <p class="errors" v-if="errors.type == 'country'">
                {{ errors.message }}
            </p>
            <button type="submit">Update User</button>
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
        password: '',
        bio: this.$store.getters.SelectedUser.bio,
        country: this.$store.getters.SelectedUser.country
      },
      errors: '',
      countries: ''
    }
  },

  methods: {
    updateUser (id) {
      axios.patch('users/edit-user/' + id, this.form)
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
