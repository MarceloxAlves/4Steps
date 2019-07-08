<template>
    <q-page padding>
        <q-card>
            <q-card-section>
                <q-form class="row"
                @submit="salvar">
                  <div class="text-h6 q-mb-md">Recursos de Trabalho</div>
                  <div class="col-12 col-md-12 col-sm-12">
                    <div class="col-12 input">
                      <q-input
                        filled
                        v-model="disponibilidade.trabalho.fonte"
                        type="text"
                        label="Fonte de Recurso"
                        lazy-rules
                        :rules="[ val => val && val.length > 0 || 'Digite o nome da fonte recurso']"
                      />
                    </div>
                  </div>
                  <div class="col-12 col-md-12 col-sm-12">
                    <div class="col-12 input">
                      <q-input
                        filled
                        v-model="disponibilidade.trabalho.justificativa"
                        type="text"
                        label="Justificativa"
                      />
                    </div>
                  </div>
                  <div class="col-12 col-md-12 col-sm-12">
                    <div class="col-12 input">
                      <q-input
                        filled
                        v-model="disponibilidade.trabalho.valor"
                        label="Valor"
                        mask="#.##"
                        fill-mask="0"
                        reverse-fill-mask
                        input-class="text-right"
                      />
                    </div>
                  </div>
                  <div class="text-h6 q-mb-md">Recursos Materiais</div>
                  <div class="col-12 col-md-12 col-sm-12">
                    <div class="col-12 input">
                      <q-input
                        filled
                        v-model="disponibilidade.materiais.fonte"
                        type="text"
                        label="Fonte de Recurso"
                        lazy-rules
                        :rules="[ val => val && val.length > 0 || 'Digite o nome da fonte recurso']"
                      />
                    </div>
                  </div>
                  <div class="col-12 col-md-12 col-sm-12">
                    <div class="col-12 input">
                      <q-input
                        filled
                        v-model="disponibilidade.materiais.justificativa"
                        type="text"
                        label="Justificativa"
                      />
                    </div>
                  </div>
                  <div class="col-12 col-md-12 col-sm-12">
                    <div class="col-12 input">
                      <q-input
                        filled
                        v-model="disponibilidade.materiais.valor"
                        label="Valor"
                        mask="#.##"
                        fill-mask="0"
                        reverse-fill-mask
                        input-class="text-right"
                      />
                    </div>
                  </div>
                  <div class="text-h6 q-mb-md">Recursos de Custo</div>
                  <div class="col-12 col-md-12 col-sm-12">
                    <div class="col-12 input">
                      <q-input
                        filled
                        v-model="disponibilidade.custos.fonte"
                        type="text"
                        label="Fonte de Recurso"
                        lazy-rules
                        :rules="[ val => val && val.length > 0 || 'Digite o nome da fonte recurso']"
                      />
                    </div>
                  </div>
                  <div class="col-12 col-md-12 col-sm-12">
                    <div class="col-12 input">
                      <q-input
                        filled
                        v-model="disponibilidade.custos.justificativa"
                        type="text"
                        label="Justificativa"
                      />
                    </div>
                  </div>
                  <div class="col-12 col-md-12 col-sm-12">
                    <div class="col-12 input">
                      <q-input
                        filled
                        v-model="disponibilidade.custos.valor"
                        label="Valor"
                        mask="#.##"
                        fill-mask="0"
                        reverse-fill-mask
                        input-class="text-right"
                      />
                    </div>
                  </div>
                  <div class="col-12 col-md-12 col-sm-12">
                      <q-btn label="Salvar" type="submit" color="primary"/> &nbsp;
                    </div>
                </q-form>
            </q-card-section>
        </q-card>
    </q-page>
</template>

<script>
export default {
  name: 'DisponibilidadeForm',
  props: ['projeto'],
  data () {
    return {
      disponibilidade: {
        id: null,
        projeto_id: null,
        trabalho: {
          fonte: '',
          justificativa: '',
          valor: 0
        },
        materiais: {
          fonte: '',
          justificativa: '',
          valor: 0
        },
        custos: {
          fonte: '',
          justificativa: '',
          valor: 0
        }
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
    if (this.projeto) {
      this.disponibilidade.projeto_id = this.projeto.id
      this.getDisponibilidade()
    }
  },
  methods: {
    async getDisponibilidade () {
      var app = this
      this.$q.loading.show()
      await this.$firestore.collection('disponibilidades').where('projeto_id', '==', this.projeto.id).get()
        .then(function (query) {
          if (query.docs.length > 0) {
            app.disponibilidade = query.docs[0].data()
            app.disponibilidade.id = query.docs[0].id
          } else {
            app.$firestore.collection('disponibilidades').doc().set(app.disponibilidade).then(
              function (disp) {
                app.disponibilidade = disp.data()
                app.disponibilidade.id = disp.id
                app.$msg.success('Disponibilidade adicionada com sucesso')
              }
            ).catch(() => { app.$msg.success('Erro ao carregar disponibilidade') })
          }
          app.$q.loading.hide()
        })
        .catch(function () {
          app.$q.loading.hide()
          app.$msg.error('Erro ao exibir ')
        })
    },
    async salvar () {
      var app = this
      var projetoRef = await app.$firestore.collection('projetos').doc(this.projeto.id)
      app.$firestore.collection('disponibilidades').doc(app.disponibilidade.id).update(app.disponibilidade).then(
        function (disp) {
          app.$models.timeline.add('Disponibilidade alterada', projetoRef, null)
          app.$msg.success('Disponibilidade alterada com sucesso')
        }
      ).catch(() => { app.$msg.error('Erro ao alterar disponibilidade') })
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
