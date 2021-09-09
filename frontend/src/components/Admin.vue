<template>
  <div>
    <h1>
      Admin Panel
    </h1>
      <div>
        <h3>
        All Posts
        </h3>
        <p>
          Total amount of posts: {{ allPosts.length }}
        </p>
        <p @click="navigatePost(post._id)" v-for="post in allPosts" :key="post._id">
            {{ post.title }}
            {{ post.category }}
        </p>
    </div>
    <div>
      <h3>
      All Users
      </h3>
      <div v-for="user in allUsers" :key="user._id">
        <p @click="clickUser(user._id)">
        {{ user.username }}
        </p>
        <p>
          Edit
        </p>
        <p @click="deleteUser(user._id, user.username)">
          Delete
        </p>
        <hr>
      </div>
    </div>
    <div>
        <h3>
            Register User
        </h3>
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
            <select name="country" v-model="form.country">
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
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import axios from 'axios'
export default {
  name: 'Admin',

  mounted () {
    this.fetchPosts()
    this.getUsers()
    this.getCountries()
  },

  data () {
    return {
      allUsers: '',
      form: {
        username: '',
        email: '',
        password: '',
        bio: '',
        country: ''
      },
      errors: '',
      countries: ''
    }
  },

  computed: mapGetters(['allPosts', 'StateUser']),

  methods: {
    ...mapActions(['fetchPosts', 'navigateToPost', 'getUser']),

    register () {
      axios
        .post('/users/register', this.form)
        .then((res) => {
          console.log(res)
          if (res.status === 201) {
            alert('User Created')
          }
          this.getUsers()
          this.form = {
            username: '',
            email: '',
            password: '',
            bio: '',
            country: ''
          }
        })
        .catch((err) => {
          this.errors = err.response.data.error
          console.log(err.response)
        })
    },

    navigatePost (id) {
      this.navigateToPost(id)
    },

    getUsers () {
      axios.get('users/allusers')
        .then(res => {
          this.allUsers = res.data.message
          console.log(res)
        })
    },

    clickUser (id) {
      this.getUser(id)
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
    },

    deleteUser (id, username) {
      if (prompt('Write ' + username + ' to delete the user. This is an irreversible action') === username) {
        axios.delete('users/delete-user/' + id)
          .then(res => {
            console.log(res)
            this.getUsers()
            alert('User Deleted')
          })
      } else {
        alert('Username was incorrectly written')
      }
    }
  }
}
</script>

<style>

</style>
