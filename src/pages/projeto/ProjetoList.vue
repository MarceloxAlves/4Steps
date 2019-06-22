<template>
  <q-page class="row">
    <div class="col-12 flex flex-center page">
      <div style="width: 100%" class="text-h4 text-center">Meus Projetos</div>
      <q-card @click="novo" class="card-project text-white flex flex-center">
        <q-card-section>
          <q-icon name="add" clickable style="font-size: 6rem;" />
        </q-card-section>
      </q-card>
      <q-card v-for="(projeto, index) in projetos" :key="index" :to="'projeto/'+ projeto.id +'/view'"
              class="card-project text-white" :style="'background: radial-gradient(circle, #333 0%, '+ projeto.color + ' 0%);'">
        <q-card-section>
          <div class="row text-h6" style="width: 100%">
            <div class="col-4 text-center">
              <q-btn icon="visibility" :to="'projeto/'+ projeto.id +'/view'" dense  />
            </div>
            <div class="col-4">
              <q-btn icon="edit" class="edit" :to="'projeto/'+ projeto.id +'/edit'" dense  />
            </div>
            <div class="col-4">
              <q-btn icon="delete" class="delete"  @click="onDelete(projeto)" dense  />
            </div>
            <div class="col-12" style="border-bottom: 1px solid white">
              {{projeto.nome}}
            </div>
          </div>
          <small  class="col-12 text-justify">{{projeto.admin.displayName}}</small>
        </q-card-section>

        <q-card-section style="overflow: hidden; max-height:80px">
          <p v-html="projeto.descricao"></p>
        </q-card-section>
      </q-card>
    </div>
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
      this.$firestore.collection('projetos').where('admin.email', '==', app.$auth.currentUser.email).orderBy('nome')
        .get()
        .then(function (querySnapshot) {
          app.projetos = []
          querySnapshot.forEach(function (doc) {
            let obj = doc.data()
            obj.id = doc.id
            app.projetos.push(obj)
          })
          app.$q.loading.hide()
        })
        .catch(function (error) {
          app.$msg.error('Erro ao carregar os dados' + error.message)
          app.$q.loading.hide()
        })
    },
    onDelete (projeto) {
      var app = this
      this.$msg.confirm('Deletar', `Deseja deletar o projeto ${projeto.nome}?`).then(function () {
        app.$firestore.collection('projetos').doc(projeto.id).delete().then(function () {
          app.$msg.success('Projeto deletado com sucesso!')
          app.onreload()
        }).catch(function (error) {
          app.$msg.error('Não foi possível deletar este projeto Error: ' + error.message)
        })
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
    padding-bottom: 10px;
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
