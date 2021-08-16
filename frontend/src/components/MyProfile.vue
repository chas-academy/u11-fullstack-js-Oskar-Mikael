<template>
  <div>
      <h2>
          {{ this.StateUser.message.username }}
      </h2>
      <p>
        Update password
      </p>
      <form @submit.prevent="updatePassword">
        <input type="password" v-model="form.newPassword">
        <button type="submit">Change Password</button>
      </form>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import axios from 'axios'
export default {
  name: 'MyProfile',

  data () {
    return {
      form: {
        newPassword: ''
      }
    }
  },

  computed: mapGetters(['StateUser']),

  methods: {
    updatePassword () {
      axios.patch('/users/change-password', this.form)
        .then(res => {
          console.log(res)
          alert(res.data.message)
        })
        .catch(err => {
          console.log(err)
          alert(err.response.data.message)
        })
    }
  }
}
</script>

<style>

</style>
