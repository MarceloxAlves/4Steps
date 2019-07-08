<template>
    <q-page padding>
      <q-list  bordered class="rounded-borders" style="max-width: 100%">
        <q-item-label header style="border-bottom: 1px solid #00003e">
          <q-btn @click="$router.replace($route.path + '/recursos/add')" flat icon="add" label=" Recurso" type="button" color="primary"/>
          &nbsp;
          <q-knob
            show-value
            :readonly="true"
            :max="orcado"
            font-size="12px"
            v-model="total"
            size="60px"
            :thickness="0.20"
            :color="(valor <= total) ? 'teal' : 'orange-14'"
            track-color="grey-3"
            class="q-ma-md"
            title="Percentual ao valor orçado!"
          >
            {{ new Intl.NumberFormat('pt-BR', { maximumFractionDigits: 1, minimumFractionDigits: 1 }).format(valor / orcado * 100) }}%
          </q-knob>
          <q-chip outline color="teal" text-color="white" icon="attach_money">R$ {{  new Intl.NumberFormat('pt-BR', { maximumFractionDigits: 2, minimumFractionDigits: 2 }).format(valor) }}</q-chip>
          <q-chip outline color="orange" text-color="white" icon="attach_money">Orçado. R$ {{  new Intl.NumberFormat('pt-BR', { maximumFractionDigits: 2, minimumFractionDigits: 2 }).format(orcado) }}</q-chip>
        </q-item-label>
        <q-item v-for="recurso in recursos" :key="recurso.id" style="border-bottom:1px solid #ccc">
          <q-item-section avatar top>
            <q-icon :name="$models.tipo_recurso.get(recurso.tipo_recurso_id).icon" color="black" size="34px" />
          </q-item-section>

          <q-item-section top>
            <q-item-label lines="1">
              <a style="cursor: pointer" class="text-weight-medium"   @click="recurso_selected=recurso; view=true">{{recurso.nome}}</a>
            </q-item-label>
            <q-item-label caption lines="2" v-html="recurso.descricao">
            </q-item-label>
            <q-item-label lines="1" class="q-mt-xs text-body2 text-weight-bold text-primary text-uppercase">
              <q-chip dense class="text-white" :color="$models.dadosFixos.getStatusRecurso(recurso.disponivel).color" icon="bookmark">{{$models.dadosFixos.getStatusRecurso(recurso.disponivel).nome}}</q-chip>
              <q-chip dense class="text-white" icon="attach_money" color="secondary">R$ {{new Intl.NumberFormat('pt-BR', { maximumFractionDigits: 2, minimumFractionDigits: 2 }).format(recurso.valor * recurso.quantidade)}}</q-chip>
            </q-item-label>
          </q-item-section>

          <q-item-section top side>
            <div class="text-grey-8 q-gutter-xs">
              <q-btn class="gt-xs" size="12px" color="green" flat dense round icon="done" />
              <q-btn class="gt-xs" size="12px" @click="$router.replace($route.path + '/recursos/'+recurso.id+'/edit')" color="primary" flat dense round icon="edit" />
              <q-btn class="gt-xs" size="12px" @click="onDelete(recurso)" color="red" flat dense round icon="delete" />
              <q-btn size="12px" flat dense round icon="more_vert" />
            </div>
          </q-item-section>
        </q-item>
      </q-list>

      <q-dialog v-if="recurso_selected" v-model="view" persistent transition-show="flip-down" transition-hide="flip-up">
        <q-card class="bg-primary text-white">
          <q-bar>
            <q-icon name="network_wifi" />
            <q-icon name="network_cell" />
            <q-icon name="battery_full" />
            <div>{{(new Date()).getHours() + ':' +  (new Date()).getMinutes()}}</div>

            <q-space />

            <q-btn dense flat icon="close" v-close-popup>
              <q-tooltip content-class="">Fechar</q-tooltip>
            </q-btn>
          </q-bar>

          <q-card-section>
            <div class="text-h6">{{recurso_selected.nome}}</div>
          </q-card-section>

          <q-card-section class="text-center">
            <q-knob
              show-value
              :readonly="true"
              :max="orcado"
              font-size="12px"
              :v-model="total"
              size="60px"
              :thickness="0.20"
              color="teal"
              track-color="grey-3"
              class="q-ma-md"
              title="Percentual ao valor orçado!"
            >
              {{ new Intl.NumberFormat('pt-BR', { maximumFractionDigits: 1, minimumFractionDigits: 1 }).format((recurso_selected.valor * recurso_selected.quantidade) / orcado * 100) }}%
            </q-knob>
            <q-chip outline color="white" text-color="white" icon="attach_money">R$ {{  new Intl.NumberFormat('pt-BR', { maximumFractionDigits: 2, minimumFractionDigits: 2 }).format(valor_selected) }}</q-chip>
          <br>
            <q-chip outline color="white" text-color="white">Valor Unid. R$ {{recurso_selected.valor}}</q-chip>
            <q-chip outline color="white" text-color="white">Unid. {{$models.dadosFixos.getUnidade(recurso_selected.unidade).label}}</q-chip>
            <q-chip outline color="white" text-color="white">Qtd. {{recurso_selected.quantidade}}</q-chip>
          </q-card-section>

          <q-card-section v-html="recurso_selected.descricao" style="min-width: 500px;">
          </q-card-section>
        </q-card>
      </q-dialog>
    </q-page>
</template>

<script>
export default {
  name: 'RecursoList',
  props: ['projeto', 'tipo'],
  data () {
    return {
      recursos: [],
      recurso_selected: null,
      valor_selected: 0,
      view: false,
      total: 0,
      valor: 0,
      orcado: 0,
      disponibilidade: null
    }
  },
  watch: {
    recurso_selected: function (val) {
      this.valor_selected = val.valor * val.quantidade
      if (this.tipo === 'ztcxIcvBpYMZOPWDSxqo') {
        this.orcado = this.disponibilidade.trabalho.valor
      } else if (this.tipo === 'gVLfM4kRENodgVI7XFWK') {
        this.orcado = this.disponibilidade.materiais.valor
      } else if (this.tipo === 'j24nWQIVwFKB1riHntaH') {
        this.orcado = this.disponibilidade.custos.valor
      }
    },
    disponibilidade: function (val) {
      if (!this.tipo) {
        console.log(this.disponibilidade)
        this.orcado = parseFloat(this.disponibilidade.trabalho.valor) + parseFloat(this.disponibilidade.materiais.valor) + parseFloat(this.disponibilidade.custos.valor)
      } else if (this.tipo === 'ztcxIcvBpYMZOPWDSxqo') {
        this.orcado = this.disponibilidade.trabalho.valor
      } else if (this.tipo === 'gVLfM4kRENodgVI7XFWK') {
        this.orcado = this.disponibilidade.materiais.valor
      } else if (this.tipo === 'j24nWQIVwFKB1riHntaH') {
        this.orcado = this.disponibilidade.custos.valor
      }
    }
  },
  created () {
    this.getDisponibilidade()
    this.onReload()
  },
  methods: {
    async getDisponibilidade () {
      this.disponibilidade = await this.$models.recurso.getOrcamento(this.projeto.id)
    },
    async onReload () {
      if (!this.tipo) {
        this.recursos = await this.$models.recurso.list(this.projeto.id)
      } else {
        this.recursos = await this.$models.recurso.listByTipo(this.projeto.id, this.tipo)
      }
      var app = this
      app.valor = 0
      this.recursos.forEach((recurso) => { app.valor += ((parseFloat(recurso.valor) * recurso.quantidade)) })
      this.total = this.valor
    },
    onDelete (recurso) {
      var app = this
      this.$msg.confirm('Deletar', `Deseja deletar o recurso ${recurso.nome}?`).then(function () {
        app.$firestore.collection('recursos').doc(recurso.id).delete().then(function () {
          app.$msg.success('Recurso deletado com sucesso!')
          app.onReload()
        }).catch(function (error) {
          app.$msg.error('Não foi possível deletar este recurso Error: ' + error.message)
        })
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
