<template>
  <q-page padding>
    <q-card>
      <q-card-section>
        <q-breadcrumbs>
          <q-breadcrumbs-el to="/home" label="Início" icon="home"/>
          <q-breadcrumbs-el to="/projeto" label="Projeto" icon="widgets"/>
          <q-breadcrumbs-el label="Formulário"/>
        </q-breadcrumbs>
      </q-card-section>
    </q-card>
    <q-card>
      <q-card-section>
        <q-form class="row"
                @submit="salvar">
          <div class="col-12  input">
            <q-input
              filled
              v-model="projeto.nome"
              type="text"
              label="Nome do Projeto *"
              lazy-rules
              :rules="[ val => val && val.length > 0 || 'Digite o nome do projeto']"
            />
          </div>
          <div class="col-12  input">
            Descrição do projeto
            <q-editor v-model="projeto.descricao" min-height="5rem" />
          </div>
          <div class="col-12  col-md-4 input">
            <q-input
              filled
              v-model="projeto.color"
              class="my-input"
            >
              <template v-slot:append>
                <q-icon name="colorize" class="cursor-pointer">
                  <q-popup-proxy transition-show="scale" transition-hide="scale">
                    <q-color v-model="projeto.color" />
                  </q-popup-proxy>
                </q-icon>
              </template>
            </q-input>
          </div>
          <div class="col-12 col-md-3 input">
            <q-input filled v-model="projeto.data_incial" label="Data inicial" >
              <template v-slot:append>
                <q-icon name="event" class="cursor-pointer">
                  <q-popup-proxy ref="qDateProxy" transition-show="scale" transition-hide="scale">
                    <q-date mask="DD/MM/YYYY" v-model="projeto.data_incial" @input="() => $refs.qDateProxy.hide()" />
                  </q-popup-proxy>
                </q-icon>
              </template>
            </q-input>
          </div>
          <div class="col-12 col-md-3 input">
            <q-input filled v-model="projeto.data_final" label="Data final">
              <template v-slot:append>
                <q-icon name="event" class="cursor-pointer">
                  <q-popup-proxy ref="qDateProxy" transition-show="scale" transition-hide="scale">
                    <q-date mask="DD/MM/YYYY" v-model="projeto.data_final" @input="() => $refs.qDateProxy.hide()" />
                  </q-popup-proxy>
                </q-icon>
              </template>
            </q-input>
          </div>
          <div class="col-12 col-md-12 col-sm-12">
            <q-btn label="Salvar Projeto" type="submit" color="primary"/>
            &nbsp;
            <q-btn to="/projeto" label="Listagem de Projetos" color="warning"/>
          </div>
        </q-form>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script>
export default {
  name: 'ProjetoForm',
  data () {
    return {
      projeto: {
        nome: '',
        data_incial: '',
        data_final: '',
        descricao: '',
        color: '#014a88',
        admin: this.$auth.currentUser.toJSON()
      },
      editando: false
    }
  },
  created () {
    if (this.$route.params.projeto_id) {
      this.editando = true
      this.getProjeto()
    }
  },
  methods: {
    getProjeto () {
      var app = this
      this.$q.loading.show()
      this.$firestore.collection('projetos').doc(this.$route.params.projeto_id).get()
        .then(function (doc) {
          app.projeto = doc.data()
          app.$q.loading.hide()
        })
        .catch(function () {
          app.$q.loading.hide()
          app.$msg.error('Erro ao carregar projeto ')
        })
    },
    salvar () {
      var app = this
      this.$q.loading.show()
      if (this.editando) {
        this.$firestore.collection('projetos').doc(this.$route.params.projeto_id).update(this.projeto)
          .then(function () {
            app.$q.loading.hide()
            app.$timeline.register('alteração de projeto', app.$firestore.collection('projetos').doc(app.$route.params.projeto_id), app.$firestore.collection('projetos').doc(app.$route.params.projeto_id))
            app.$msg.success('Projeto alterado com sucesso!')
          })
          .catch(function (err) {
            app.$q.loading.hide()
            app.$msg.error('Erro ao alterar projeto ' + err.message)
          })
      } else {
        this.$firestore.collection('projetos').doc().set(this.projeto)
          .then(function () {
            app.$q.loading.hide()
            app.$msg.success('Projeto salvo com sucesso!')
          })
          .catch(function (err) {
            app.$q.loading.hide()
            app.$msg.error('Erro ao salvar projeto ' + err.message)
          })
      }
    }
  }
}
</script>

<style scoped>
  .input{
    padding-right: 10px;
    margin-bottom: 10px;
  }
  .color-imput{
    margin-left: 50%;
  }
</style>
