<template>
  <div class="q-pa-md" style="max-width: 100%; width: 30%">

    <q-form
      @submit="onSubmit"
      @reset="onReset"
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
    </q-form>

  </div>
</template>

<script>
export default {
  name: 'Login',
  data: function () {
    return {
      email: '',
      password: '',
      accept: false
    }
  },
  methods: {
    login () {
      alert('Marcelo Alces')
      this.$auth.signInWithEmailAndPassword(this.email, this.password).then((user) => {
        this.$router.replace('/comics')
      }).catch((err) => {
        alert(err.message)
      })
    }
  }
}
</script>

<style>
</style>
