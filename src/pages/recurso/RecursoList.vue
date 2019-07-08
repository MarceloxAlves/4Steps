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
                      <q-btn label="Salvar" type="submit" color="primary"/> &nbsp;
                      <q-btn :to="'/projeto/'+recurso.projeto_id+'/view'" label="Visão do Projeto" type="button" color="primary"/>
                    </div>
                </q-form>
            </q-card-section>
        </q-card>
    </q-page>
</template>

<script>
export default {
  name: 'RecursoList',
  props: ['projeto', 'tipo'],
  data () {
    return {
      recursos: []
    }
  },
  created () {
  },
  methods: {
    async onReload () {
      this.recursos = await this.$models.recurso.list(this.projeto.id)
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
