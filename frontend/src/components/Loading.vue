<template>
  <div v-if="this.isLoading" class="modal">
    <div class="lds-roller">
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'Loading',

  computed: mapGetters(['isLoading'])
}
</script>

<style>

</style>
