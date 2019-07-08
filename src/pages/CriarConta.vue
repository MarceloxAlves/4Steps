<template>
  <q-page  class="row flex flex-center">
    <div class="q-pa-md col-sm-12 col-md-6">
      <Logo></Logo>
      <q-form
        @submit="login"
        class="q-gutter-md"
      >
        <q-input
          filled
          v-model="nome"
          type="text"
          label="Nome *"
          hint="Digite seu Nome"
          lazy-rules
          :rules="[ val => val && val.length > 0 || 'Digite seu nome']"
        />

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
        <div class="col-sm-12">
          <q-btn style="width: 100%" label="Criar Conta" type="submit" color="primary"/>
        </div>

        <p>
          <q-btn style="width: 100%"  tag="a" to="/login" class="link-nova">Já tenho uma conta</q-btn>
        </p>

      </q-form>

    </div>
  </q-page>
</template>

<script>
import Logo from '../components/logo'
export default {
  name: 'CriarConta',
  components: { Logo },
  data: function () {
    return {
      email: '',
      password: '',
      nome: '',
      accept: false
    }
  },
  created () {
  },
  methods: {
    login () {
      let user = this.$models.user.account(this.nome, this.email, this.password)
      if (user) {
        this.$router.replace('/home')
      }
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
