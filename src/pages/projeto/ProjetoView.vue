<template>
  <q-page padding >
    <q-card>
      <q-card-section>
        <q-breadcrumbs>
          <q-breadcrumbs-el to="/home" label="Início" icon="home"/>
          <q-breadcrumbs-el to="/projeto" label="Projeto" icon="widgets"/>
          <q-breadcrumbs-el class="text-bold" :style="'color:' + projeto.color + ';'" :label="projeto.nome"/>
        </q-breadcrumbs>
      </q-card-section>
    </q-card>
    <div class="row" style="padding-top: 20px;">
      <div class="col-12 col-md-9">
          <q-splitter
            v-model="splitterModel"
            style="height: auto"
          >
            <template v-slot:before>
              <div class="q-pa-md" >
                <q-input ref="filter" filled v-model="filter" label="Filter">
                  <template v-slot:append>
                    <q-icon v-if="filter !== ''" name="clear" class="cursor-pointer" @click="resetFilter" />
                  </template>
                </q-input>
                <q-tree
                  :nodes="simple"
                  node-key="label"
                  selected-color="primary"
                  :filter="filter"
                  :selected.sync="selected"
                  default-expand-all
                />
              </div>
            </template>

            <template v-slot:after>
              <q-tab-panels
                v-model="selected"
                animated
                transition-prev="jump-up"
                transition-next="jump-up"
              >
                <q-tab-panel name="Detalhes do projeto">
                  <div  class="text-h5 q-mb-md">Detalhes do Projeto</div>
                  <hr>
                  <div class="text-h6">{{projeto.nome}}</div>
                  <p v-html="projeto.descricao" class="text-justify"></p>
                </q-tab-panel>
                <q-tab-panel name="Recursos do Projeto">
                  <div class="text-h4 q-mb-md">Recursos do projeto</div>
                  <q-btn label="Adicionar Recurso" @click="novoRecurso" color="primary"/>
                </q-tab-panel>
                <q-tab-panel name="Recursos de Trabalho">
                  <div class="text-h4 q-mb-md">Recursos de Trabalho</div>
                    <q-list dense padding class="rounded-borders">
                      <q-item clickable v-ripple>
                        <q-item-section v-for="(recurso, index) in recursosTrabalho" :key="index" >
                          {{recurso.nome}}
                        </q-item-section>
                      </q-item>
                    </q-list>
                </q-tab-panel>

                <q-tab-panel name="Recursos Materiais">
                  <div class="text-h4 q-mb-md">Recursos Materiais</div>
                  <q-btn push label="Adicionar Recurso" @click="novoRecurso" color="primary"/>
                  <q-list dense padding class="rounded-borders">
                    <q-item clickable v-for="(recurso, index) in recursosMateriais" :key="index">
                      <q-item-section>
                        <q-item-label> {{recurso.nome}}</q-item-label>
                        <q-item-label caption>{{recurso.descricao}}</q-item-label>
                      </q-item-section>

                      <q-item-section side top>
                        <q-badge color="teal" label="10k" />
                      </q-item-section>
                      <q-item-section side top>
                        <q-btn flat label="Fornecedores" icon="truck" color="secondary"/>
                      </q-item-section>
                    </q-item>
                    </q-list>
                </q-tab-panel>

                <q-tab-panel name="Recursos de Custos">
                  <div class="text-h4 q-mb-md">Recursos de Custos</div>
                  <q-list dense padding class="rounded-borders">
                      <q-item clickable v-ripple>
                        <q-item-section v-for="(recurso, index) in recursosCustos" :key="index" >
                          {{recurso.nome}}
                        </q-item-section>
                      </q-item>
                    </q-list>
                </q-tab-panel>

                <q-tab-panel name="Colaboradores">
                  <div class="text-h6 q-mb-md">Colaboradores do Projeto</div>
                  <q-input  type="email" ref="filter" filled v-model="colaborador" label="email do colaborador">
                    <template v-slot:append>
                      <q-icon v-if="colaborador !== ''" name="search" class="cursor-pointer" @click="procurarColaborador" />
                    </template>
                  </q-input>
                  {{colaboradorFilter}}
                </q-tab-panel>
              </q-tab-panels>
            </template>
          </q-splitter>
      </div>
      <div class="col-12 col-md-3">
        <p>Timeline do projeto</p>
      </div>
    </div>
  </q-page>
</template>

<script>
export default {
  name: 'ProjetoForm',
  data () {
    return {
      projeto: {},
      recursosTrabalho: [],
      recursosMateriais: [],
      recursosCustos: [],
      splitterModel: 50,
      selected: 'Detalhes do projeto',
      filter: '',
      colaborador: '',
      colaboradorFilter: '',
      simple: [
        {
          label: 'Detalhes do projeto',
          children: [
            {
              label: 'Colaboradores',
              icon: 'peoples',
              id: 'ztcxIcvBpYMZOPWDSxqo'
            },
            {
              label: 'Prazos',
              icon: 'layers',
              id: 'gVLfM4kRENodgVI7XFWK'
            }
          ]
        },
        {
          label: 'Recursos do Projeto',
          children: [
            {
              label: 'Recursos de Trabalho',
              icon: 'rowing',
              id: 'ztcxIcvBpYMZOPWDSxqo'
            },
            {
              label: 'Recursos Materiais',
              icon: 'layers',
              id: 'gVLfM4kRENodgVI7XFWK'
            },
            {
              label: 'Recursos de Custos',
              icon: 'attach_money',
              id: 'j24nWQIVwFKB1riHntaH'
            }
          ]
        }
      ]
    }
  },
  created () {
    if (this.$route.params.projeto_id) {
      this.getProjeto()
      this.getRecursosTrabalho()
      this.getRecursosMateriais()
      this.getRecursosCustos()
    }
  },
  methods: {
    getProjeto () {
      var app = this
      this.$q.loading.show()
      this.$firestore.collection('projetos').doc(this.$route.params.projeto_id)
        .onSnapshot(function (doc) {
          app.projeto = doc.data()
          app.projeto.id = doc.id
          app.$q.loading.hide()
        })
    },
    resetFilter () {
      this.filter = ''
      this.$refs.filter.focus()
    },
    procurarColaborador () {
      var app = this
      this.$q.loading.show()
      console.log(this.$admin)
      this.$admin.auth().getUserByEmail(app.colaborador)
        .then(function (userRecord) {
          console.log(userRecord)
          app.$q.loading.hide()
        })
        .catch(function (err) {
          app.$q.loading.hide()
          app.$msg.error('Erro ao carregar  usuário Codigo:' + err.code + ' Message: ' + err.message)
        })
    },
    novoRecurso () {
      this.$router.replace(this.$route.path + '/recursos/add')
    },
    getRecursosTrabalho () {
      this.$q.loading.show()
      var app = this
      this.$firestore.collection('recursos').where('tipo_recurso_id', '==', 'ztcxIcvBpYMZOPWDSxqo')
        .where('projeto_id', '==', this.$route.params.projeto_id)
        .orderBy('nome')
        .get()
        .then(function (querySnapshot) {
          app.recursosTrabalho = []
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
    getRecursosMateriais () {
      this.$q.loading.show()
      var app = this
      this.$firestore.collection('recursos').where('tipo_recurso_id', '==', 'gVLfM4kRENodgVI7XFWK')
        .where('projeto_id', '==', this.$route.params.projeto_id)
        .orderBy('nome')
        .get()
        .then(function (querySnapshot) {
          app.recursosMateriais = []
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

      app.recursosMateriais = [
        {
          nome: 'Cabos Eternet',
          descricao: 'Será utilizado 12 metros na instalação de access point',
          quantidade: 15,
          valor: 3.00,
          disponivel: 'Comprar',
          projeto_id: this.$route.params.projeto_id,
          tipo_recurso_id: 'Materiais',
          unidade: 'Metro'
        }
      ]
    },
    getRecursosCustos () {
      this.$q.loading.show()
      var app = this
      this.$firestore.collection('recursos').where('tipo_recurso_id', '==', 'j24nWQIVwFKB1riHntaH')
        .where('projeto_id', '==', this.$route.params.projeto_id)
        .orderBy('nome')
        .get()
        .then(function (querySnapshot) {
          app.recursosCustos = []
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
    }
  }
}
</script>

<style >
  .q-splitter__before{
    width:30% !important;
  }
  .q-splitter__after{
    width:70% !important;
  }

</style>
