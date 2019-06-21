<template>
  <q-layout class="layout" view="lHh Lpr lFf" >
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { openURL } from 'quasar'

export default {
  name: 'HomeLayout',
  data () {
    return {
      leftDrawerOpen: true
      // leftDrawerOpen: this.$q.platform.is.desktop
    }
  },
  methods: {
    openURL
  }
}
</script>

<style>

</style>
