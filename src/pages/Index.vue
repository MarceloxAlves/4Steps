<template>
  <q-page class="flex flex-center">
    <q-carousel
      swipeable
      autoplay
      animated
      v-model="slide"
      :fullscreen.sync="fullscreen"
      infinite
    >
      <q-carousel-slide :name="1" img-src="assets/bg.jpg">
        <div class="absolute-center custom-caption">
          <div class="text-h2"><logo></logo></div>
          <p class="text-white">Gerencie seus recursos, adquirindo de maneira controlada</p>
          <div class="col-sm-12 flex flex-center">
            <q-btn label="Já tenho conta" push to="/login" icon="fa fa-user"  text-color="primary" color="white"/> &nbsp; &nbsp;
            <q-btn label="Criar nova conta" push to="/criar-conta"  icon="fa fa-user-plus" text-color="primary"  color="white"/>
          </div>
          <br>
        </div>
        <div class="col-sm-12 flex flex-center text-right">
          <q-btn label="Baixar na google play" flat  icon="fa fa-play" text-color="white"  color="green"/>
          <q-btn label="Desktop Windows" flat  icon="fa fa-download" text-color="white"  color="green"/>
        </div>
      </q-carousel-slide>
    </q-carousel>
  </q-page>
</template>

<style>
</style>

<script>
import Logo from '../components/logo'
export default {
  name: 'PageIndex',
  components: { Logo },
  data () {
    return {
      slide: 1,
      fullscreen: true
    }
  }
}
</script>
