<template>
  <div>
      <h2>
          {{ this.SelectedUser.message.username }}
      </h2>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'Profile',

  computed: mapGetters(['SelectedUser'])
}
</script>

<style>

</style>
