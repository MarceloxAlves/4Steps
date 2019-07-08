<template>
    <q-page padding>
        <q-card>
            <q-card-section>
                <q-breadcrumbs>
                    <q-breadcrumbs-el to="/home" label="Início" icon="home"/>
                    <q-breadcrumbs-el to="/projeto" label="Projeto" icon="widgets"/>
                    <q-breadcrumbs-el label="Adicionar Recurso"/>
                </q-breadcrumbs>
            </q-card-section>
        </q-card>
        <q-card>
            <q-card-section>
                <q-form class="row"
                @submit="salvar">
                    <div class="col-12 input">
                      <q-select filled v-model="recurso.tipo_recurso_id" :options="options" label="Tipo de Recurso" emit-value map-options/>
                    </div>
                    <div class="col-12 input">
                        <q-input
                            filled
                            v-model="recurso.nome"
                            type="text"
                            label="Nome do Recurso *"
                            lazy-rules
                            :rules="[ val => val && val.length > 0 || 'Digite o nome do recurso']"
                        />
                    </div>
                    <div class="col-4 input">
                        <q-input
                            v-model.number="recurso.quantidade"
                            type="number"
                            label="Quantidade"
                            filled
                        />
                    </div>
                    <div class="col-4 input">
                      <q-select filled v-model="recurso.unidade" :options="unidades" label="Unidade" emit-value map-options/>
                    </div>
                  <div class="col-4 input">
                    <q-input
                      filled
                      v-model="recurso.valor"
                      label="Valor"
                      mask="#.##"
                      fill-mask="0"
                      reverse-fill-mask
                      input-class="text-right"
                    />
                  </div>
                    <div class="col-12 input">
                        <q-radio keep-color v-model="recurso.disponivel" val="0" label="Disponível" color="green" />
                        <q-radio keep-color v-model="recurso.disponivel" val="1" label="Fazer" color="orange" />
                        <q-radio keep-color v-model="recurso.disponivel" val="2" label="Comprar" color="red" />
                    </div>
                    <div class="col-12  input">
                        Descrição do Recurso
                        <q-editor v-model="recurso.descricao" min-height="5rem" />
                    </div>
                    <div class="col-12 col-md-12 col-sm-12">
                      <q-btn label="Salvar" type="submit" color="primary"/>
                      &nbsp;
                    </div>
                </q-form>
            </q-card-section>
        </q-card>
    </q-page>
</template>

<script>
export default {
  name: 'RecursoForm',
  data () {
    return {
      recurso: {
        nome: '',
        descricao: '',
        quantidade: 0,
        valor: 0.0,
        disponivel: false,
        projeto_id: this.$route.params.projeto_id,
        tipo_recurso_id: '',
        unidade: ''
      },
      editando: false,
      options: [
        {
          label: 'Recurso de Trabalho',
          value: 'ztcxIcvBpYMZOPWDSxqo'
        },
        {
          label: 'Recurso Material',
          value: 'gVLfM4kRENodgVI7XFWK'
        },
        {
          label: 'Recurso de Custo',
          value: 'j24nWQIVwFKB1riHntaH'
        }
      ],
      unidades: [
        {
          label: 'Unidade',
          value: '1'
        },
        {
          label: 'Pacote',
          value: '2'
        },
        {
          label: 'Caixa',
          value: '4'
        },
        {
          label: 'Hora',
          value: '5'
        },
        {
          label: 'Metro',
          value: '6'
        }
      ]
    }
  },
  created () {
    if (this.$route.params.recurso_id) {
      this.editando = true
      this.getRecurso()
    }
  },
  methods: {
    getRecurso () {
      var app = this
      this.$q.loading.show()
      this.$firestore.collection('recursos').doc(this.$route.params.recurso_id).get()
        .then(function (doc) {
          app.recurso = doc.data()
          app.$q.loading.hide()
        })
        .catch(function () {
          app.$q.loading.hide()
          app.$msg.error('Erro ao exibir ')
        })
    },
    salvar () {
      var app = this
      this.$q.loading.show()
      if (this.editando) {
        this.$firestore.collection('recursos').doc(this.$route.params.recurso_id).update(this.recurso)
          .then(function () {
            app.$q.loading.hide()
            app.$msg.success('Recurso salvo com sucesso!')
          })
          .catch(function (err) {
            app.$q.loading.hide()
            app.$msg.error('Erro ao salvar recurso ' + err.message)
          })
      } else {
        this.$firestore.collection('recursos').doc().set(this.recurso)
          .then(function () {
            app.$q.loading.hide()
            app.$msg.success('Recurso salvo com sucesso!')
          })
          .catch(function (err) {
            app.$q.loading.hide()
            app.$msg.error('Erro ao salvar recurso ' + err.message)
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
