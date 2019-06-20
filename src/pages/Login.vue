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
  methods: {
    login () {
      this.$auth.signInWithEmailAndPassword(this.email, this.password).then((user) => {
        sessionStorage.setItem('logged', user)
        this.$router.replace('/home')
      }).catch((err) => {
        alert(err.message)
      })
    }
  }
}
</script>

<style>
  .q-gutter-md{
    background-color: white;
    padding: 10%;
  }
  .link-nova{
    cursor: pointer;
    color: #0747A6;
  }
</style>
