<template>
  <div class="q-pa-md q-gutter-sm" >
    <q-btn label="Alterar Conta"  flat color="primary" @click="icon = true" />
    <q-dialog v-model="icon">
      <q-card>
        <q-card-section class="row items-center">
          <div class="text-h6">Alterar conta</div>
          <q-space />
          <q-btn icon="close" flat round dense v-close-popup />
        </q-card-section>
        <q-card-section>
          <q-form
            @submit="salvar"
            class="q-gutter-md"
          >
            <q-input
              filled
              v-model="user.nome"
              type="text"
              label="Nome *"
              hint="Digite seu Nome"
              lazy-rules
              :rules="[ val => val && val.length > 0 || 'Digite seu Nome']"
            />
            <div class="col-sm-12">
              <q-btn style="width: 100%" label="Salvar alterações" type="submit" color="primary"/>
            </div>
          </q-form>
        </q-card-section>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
export default {
  name: 'ContaEdit',
  props: ['contaEditOpen'],
  data: function () {
    return {
      user: {
        nome: ''
      },
      icon: false,
      bar: false,
      bar2: false,
      toolbar: false
    }
  },
  created () {
    if (this.$auth.currentUser != null) {
      this.user.nome = this.$auth.currentUser.displayName
    }
  },
  methods: {
    salvar () {
      let user = this.$auth.currentUser
      var app = this
      if (user) {
        user.updateProfile({
          displayName: app.user.nome
        }).then(function () {
          app.$q.notify({
            color: 'positive',
            position: 'bottom-right',
            message: 'Alterações salva com sucesso',
            timeout: 2500,
            textColor: 'white',
            actions: [{ icon: 'close', color: 'white' }]
          })
        }).catch((err) => {
          this.$q.notify({
            color: 'negative',
            position: 'bottom-right',
            message: err.message,
            timeout: 2500,
            textColor: 'white',
            actions: [{ icon: 'close', color: 'white' }]
          })
        })
      }
    }
  }
}
</script>

<style>
  .q-gutter-md{
    background-color: white;
    padding: 10%;
    z-index: 3000;
  }
  .link-nova{
    cursor: pointer;
    color: #0747A6;
  }
</style>
