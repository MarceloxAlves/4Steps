<template>
  <q-page class="flex flex-center">
    <q-card @click="novo" class="card-project text-white flex flex-center">
      <q-card-section>
        <q-icon name="add" clickable style="font-size: 6rem;" />
      </q-card-section>
    </q-card>
    <q-card v-for="projeto in projetos" :key="projeto"
      class="card-project text-white">
      <q-card-section>
        <div class="text-h6">{{projeto.nome}}</div>
        <div class="text-subtitle2">{{projeto.admin.displayName}}</div>
      </q-card-section>

      <q-card-section>
        {{ projeto.descricao }}
      </q-card-section>
    </q-card>

  </q-page>
</template>
<script>
export default {
  name: 'ProjetoList',
  data () {
    return {
      projetos: []
    }
  },
  created () {
    this.onreload()
  },
  methods: {
    novo () {
      this.$router.replace(this.$route.path + '/add')
    },
    onreload () {
      this.$q.loading.show()
      var app = this
      this.$firestore.collection('projetos').where('admin.email', '==', app.$auth.currentUser.email)
        .get()
        .then(function (querySnapshot) {
          querySnapshot.forEach(function (doc) {
            app.projetos.push(doc.data())
          })
          app.$q.loading.hide()
        })
        .catch(function (error) {
          app.$msg.error('Erro ao carregar os dados' + error.message)
          app.$q.loading.hide()
        })
    }
  }
}
</script>

<style>
  .card-project{
    background: radial-gradient(circle, #35a2ff 0%, #014a88 100%);
    height: 250px;
    width: 100%;
    margin: 1%;
    cursor: pointer;
  }
  .card-project:hover{
    opacity: 0.9;
  }

  @media screen and (min-width: 900px){
    .card-project{
      width: 20vw;
    }
  }

</style>
