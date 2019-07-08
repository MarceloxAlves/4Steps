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
                  <div class="text-h5 q-mb-md">Recursos do projeto</div>
                  <RecursoList :projeto="projeto" :tipo="false"></RecursoList>
                </q-tab-panel>
                <q-tab-panel name="Recursos de Trabalho">
                  <div class="text-h4 q-mb-md">Recursos de Trabalho</div>
                  <RecursoList :projeto="projeto" :tipo="'ztcxIcvBpYMZOPWDSxqo'"></RecursoList>
                </q-tab-panel>
                <q-tab-panel name="Recursos Materiais">
                  <div class="text-h4 q-mb-md">Recursos Materiais</div>
                  <RecursoList :projeto="projeto" :tipo="'gVLfM4kRENodgVI7XFWK'"></RecursoList>
                </q-tab-panel>
                <q-tab-panel name="Recursos de Custos">
                  <div class="text-h4 q-mb-md">Recursos de Custos</div>
                  <RecursoList :projeto="projeto" :tipo="'j24nWQIVwFKB1riHntaH'"></RecursoList>
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
                <q-tab-panel name="Disponibilidades">
                  <div class="text-h6 q-mb-md">Disponibilidades do Projeto</div>
                  <DisponibilidadeForm v-if="projeto" :projeto="projeto"></DisponibilidadeForm>
                </q-tab-panel>
              </q-tab-panels>
            </template>
          </q-splitter>
      </div>
      <div class="col-12 col-md-3">
        <TimeLine v-if="projeto.id" :projeto=projeto></TimeLine>
      </div>
    </div>
  </q-page>
</template>

<script>
import TimeLine from '../TimeLine'
import RecursoList from '../recurso/RecursoList'
import DisponibilidadeForm from '../recurso/DisponibilidadeForm'
export default {
  name: 'ProjetoForm',
  components: { DisponibilidadeForm, RecursoList, TimeLine },
  data () {
    return {
      projeto: {},
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
            }
          ]
        },
        {
          label: 'Disponibilidades',
          icon: 'attach_money'
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
