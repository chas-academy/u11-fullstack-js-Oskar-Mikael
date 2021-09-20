<template>
  <div>
    <h1 class="text-3xl mb-10">
      Admin Panel
    </h1>
      <div>
        <h3 class="text-xl">
        All Posts
        </h3>
        <p class="mb-6">
          Total amount of posts: {{ allPosts.length }}
        </p>
        <table class="text-center mb-10">
          <tr>
            <th>
              Title
            </th>
            <th>
              Category
            </th>
            <th>
              Creator
            </th>
            <th>
              Created At
            </th>
          </tr>
          <tr v-for="post in allPosts" :key="post._id">
            <td class="underline hover:no-underline cursor-pointer" @click="navigatePost(post._id)">
              {{ post.title }}
            </td>
            <td>
              {{ post.category }}
            </td>
            <td>
              {{ post.creator.message.username }}
            </td>
            <td>
              {{ post.createdAt }}
            </td>
          </tr>
        </table>
    </div>
    <div>
      <h3 class="text-xl">
      All Users
      </h3>
      <p class="mb-6">
        Total amount of users: {{ allUsers.length }}
      </p>
      <table class="text-center mb-10">
        <tr>
          <th>
            Username
          </th>
          <th>
            Email
          </th>
        </tr>
        <tr v-for="user in allUsers" :key="user._id">
        <td class="underline hover:no-underline cursor-pointer" @click="clickUser(user._id)">
          {{ user.username }}
        </td>
        <td>
          {{ user.email }}
        </td>
        <td class="bg-blue-600 cursor-pointer" @click="editUser(user._id)">
          Edit
        </td>
        <td class="bg-red-600 cursor-pointer" @click="deleteUser(user._id, user.username)">
          Delete
        </td>
        </tr>
      </table>
    </div>
    <div>
        <h3 class="text-xl mb-6">
            Register User
        </h3>
        <form method="post" @submit.prevent="register">
          <input placeholder="Username *" class="my-8 text-black bg-gray-200 pl-2 md:w-1/4 w-8/12 h-10 rounded-md" type="text" name="username" v-model="form.username"/><br>
            <p class="errors" v-if="errors.type == 'username'"><br>
                {{ errors.message }}
            </p>
            <input placeholder="Email *" class="my-8 text-black bg-gray-200 pl-2 md:w-1/4 w-8/12 h-10 rounded-md" type="email" name="email" v-model="form.email"/><br>
             <p class="errors" v-if="errors.type == 'email'">
                {{ errors.message }}
            </p>
            <input placeholder="Password *" class="my-8 text-black bg-gray-200 pl-2 md:w-1/4 w-8/12 h-10 rounded-md" type="password" name="password" v-model="form.password"/><br>
             <p class="errors" v-if="errors.type == 'password'">
                {{ errors.message }}
            </p>
            <input placeholder="Bio" class="my-8 text-black bg-gray-200 pl-2 md:w-1/4 w-8/12 h-10 rounded-md" type="text" name="bio" v-model="form.bio"/><br>
            <select class="my-8 text-black bg-gray-200 pl-2 md:w-1/4 w-8/12 h-10 rounded-md" name="country" v-model="form.country">
              <option hidden value="">
                -Select Country- *
              </option>
              <option v-for="country in countries" :key="country.id">
                {{ country.name }}
              </option>
            </select><br>
            <p class="errors" v-if="errors.type == 'country'">
                {{ errors.message }}
            </p>
            <button class="my-6 py-2 px-20 bg-green-600 rounded-md" type="submit">Register</button>
        </form>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions, mapMutations } from 'vuex'
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

  computed: mapGetters(['allPosts', 'StateUser', 'isLoading']),

  methods: {
    ...mapActions(['fetchPosts', 'navigateToPost', 'getUser']),
    ...mapMutations(['setSelectedUser', 'loadingTrue', 'loadingFalse']),

    register () {
      this.loadingTrue()
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
          this.loadingFalse()
        })
        .catch((err) => {
          this.errors = err.response.data.error
          console.log(err.response)
          this.loadingFalse()
        })
    },

    editUser (id) {
      this.loadingTrue()
      axios.get('users/' + id)
        .then(res => {
          this.setSelectedUser(res.data.message)
          this.$router.push('/edit-user')
          this.loadingFalse()
        })
        .catch(err => {
          console.log(err)
          this.loadingFalse()
        })
    },

    navigatePost (id) {
      this.navigateToPost(id)
    },

    getUsers () {
      this.loadingTrue()
      axios.get('users/allusers')
        .then(res => {
          this.allUsers = res.data.message
          console.log(res)
          this.loadingFalse()
        })
        .catch(err => {
          console.log(err)
          this.loadingFalse()
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
        .catch(err => {
          console.log(err)
          this.loadingFalse()
        })
    },

    deleteUser (id, username) {
      if (prompt('Write ' + username + ' to delete the user. This is an irreversible action') === username) {
        this.loadingTrue()
        axios.delete('users/delete-user/' + id)
          .then(res => {
            console.log(res)
            this.getUsers()
            alert('User Deleted')
            this.loadingFalse()
          })
          .catch(err => {
            console.log(err)
            this.loadingFalse()
          })
      } else {
        alert('Username was incorrectly written')
      }
    }
  }
}
</script>

<style scoped>
  table > tr {
    border: 2px solid black
  }

  table > tr > td {
    border: 2px solid black;
    padding: 0.4rem;
  }
</style>
