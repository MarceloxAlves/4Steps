<template>
  <q-page padding  class="row flex flex-center">
    <div class="q-pa-md col-sm-12 col-md-6">
      <Logo></Logo>
      <q-form
        @submit="login"
        class="q-gutter-md"
      >
        <q-input
          filled
          v-model="email"
          type="email"
          label="Email *"
          hint="Digite seu Email"
          lazy-rules
          :rules="[ val => val && val.length > 0 || 'Digite seu email']"
        />

        <q-input
          filled
          type="password"
          v-model="password"
          label="Senha *"
          lazy-rules
          :rules="[
          val => val !== null && val !== '' || 'Por favor digite sua senha'
        ]"
        />

        <q-toggle v-model="accept" label="Manter Logado" />

        <div class="col-sm-12">
          <q-btn style="width: 100%" label="Logar" type="submit" color="primary"/>
        </div>
        <p>
          <q-btn style="width: 100%"  tag="a" to="/criar-conta" class="link-nova">Cria uma nova conta</q-btn>
        </p>
      </q-form>

    </div>
  </q-page>
</template>

<script>
import Logo from '../components/logo'
export default {
  name: 'Login',
  components: { Logo },
  data: function () {
    return {
      email: '',
      password: '',
      accept: false
    }
  },
  created () {
    if (this.$auth.currentUser) {
      this.$router.replace('/home')
    }
  },
  methods: {
    login () {
      var app = this
      this.$q.loading.show()
      this.$auth.setPersistence('session').then(function () {
        app.$auth.signInWithEmailAndPassword(app.email, app.password).then((user) => {
          app.$q.loading.hide()
          app.$router.replace('/home')
        }).catch((err) => {
          app.$q.notify(err.message)
          app.$q.loading.hide()
        })
      }).catch((err) => {
        app.$q.loading.hide()
        app.$q.notify(err.message)
      })
    }
  }
}
</script>

<style>
  .q-gutter-md{
    background-color: white;
    padding: 5%;
  }
  .link-nova{
    cursor: pointer;
    color: #0747A6;
  }
</style>
