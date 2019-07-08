<template>
    <q-page padding>
      <q-list  bordered class="rounded-borders" style="max-width: 100%">
        <q-item-label header style="border-bottom: 1px solid #00003e">
          <q-btn @click="$router.replace($route.path + '/recursos/add')" flat icon="add" label="Adicionar Recurso" type="button" color="primary"/>
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
              <q-btn class="gt-xs" size="12px" color="red" flat dense round icon="delete" />
              <q-btn class="gt-xs" size="12px" color="green" flat dense round icon="done" />
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

          <q-card-section v-html="recurso_selected.descricao" style="min-width: 500px;">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum repellendus sit voluptate voluptas eveniet porro. Rerum blanditiis perferendis totam, ea at omnis vel numquam exercitationem aut, natus minima, porro labore.
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
      view: false
    }
  },
  watch: {
    view: function (val) {
    }
  },
  created () {
    this.onReload()
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
