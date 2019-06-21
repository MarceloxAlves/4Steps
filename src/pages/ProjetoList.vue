<template>
  <q-page class="flex flex-center">
    <q-card
      class="my-card text-white"
      style="background: radial-gradient(circle, #35a2ff 0%, #014a88 100%)"
    >
      <q-card-section>
        <div class="text-h6">Our Changing Planet</div>
        <div class="text-subtitle2">by John Doe</div>
      </q-card-section>

      <q-card-section>
        {{ lorem }}
      </q-card-section>
    </q-card>

  </q-page>
</template>

<script>
export default {
  name: 'ProjetoList',
  data () {
    return {
    }
  },
  created () {
    console.log(this.$storage)
  }
}
</script>

<style>
</style>
