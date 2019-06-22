<template>
  <q-page padding >
    <q-card>
      <q-card-section>
        <q-breadcrumbs>
          <q-breadcrumbs-el to="/home" label="Início" icon="home"/>
          <q-breadcrumbs-el to="/projeto" label="Projeto" icon="widgets"/>
          <q-breadcrumbs-el :label="projeto.nome"/>
        </q-breadcrumbs>
      </q-card-section>
    </q-card>
    <div class="row" style="padding-top: 20px;">
      <div class="col-12 col-md-9">
          <q-splitter
            v-model="splitterModel"
            style="height: 400px"
          >
            <template v-slot:before>
              <div class="q-pa-md">
                <q-tree
                  :nodes="simple"
                  node-key="label"
                  selected-color="primary"
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

                <q-tab-panel name="Recursos de Trabalho">
                  <div class="text-h4 q-mb-md">Recursos de Trabalho</div>
                  <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quis praesentium cumque magnam odio iure quidem, quod illum numquam possimus obcaecati commodi minima assumenda consectetur culpa fuga nulla ullam. In, libero.</p>
                  <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quis praesentium cumque magnam odio iure quidem, quod illum numquam possimus obcaecati commodi minima assumenda consectetur culpa fuga nulla ullam. In, libero.</p>
                </q-tab-panel>

                <q-tab-panel name="Recursos Materiais">
                  <div class="text-h4 q-mb-md">Recursos Materiais</div>
                  <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quis praesentium cumque magnam odio iure quidem, quod illum numquam possimus obcaecati commodi minima assumenda consectetur culpa fuga nulla ullam. In, libero.</p>
                  <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quis praesentium cumque magnam odio iure quidem, quod illum numquam possimus obcaecati commodi minima assumenda consectetur culpa fuga nulla ullam. In, libero.</p>
                  <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quis praesentium cumque magnam odio iure quidem, quod illum numquam possimus obcaecati commodi minima assumenda consectetur culpa fuga nulla ullam. In, libero.</p>
                </q-tab-panel>

                <q-tab-panel name="Recursos de Custos">
                  <div class="text-h4 q-mb-md">Recursos de Custos</div>
                  <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quis praesentium cumque magnam odio iure quidem, quod illum numquam possimus obcaecati commodi minima assumenda consectetur culpa fuga nulla ullam. In, libero.</p>
                  <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quis praesentium cumque magnam odio iure quidem, quod illum numquam possimus obcaecati commodi minima assumenda consectetur culpa fuga nulla ullam. In, libero.</p>
                </q-tab-panel>
              </q-tab-panels>
            </template>
          </q-splitter>
      </div>
      <div class="col-12 col-md-3">
        <div class="text-h4">{{projeto.nome}}</div>
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
      splitterModel: 50,
      selected: 'Detalhes do projeto',
      simple: [
        {
          label: 'Detalhes do projeto',
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
      this.$firestore.collection('projetos').doc(this.$route.params.projeto_id).get()
        .then(function (doc) {
          app.projeto = doc.data()
          app.$q.loading.hide()
        })
        .catch(function () {
          app.$q.loading.hide()
          app.$msg.error('Erro ao carregar projeto ')
        })
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
