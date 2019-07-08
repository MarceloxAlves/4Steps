<template>
  <q-page padding>
      <div class="q-px-lg q-pb-md">
          <q-timeline color="secondary">
              <q-timeline-entry heading>
              </q-timeline-entry>
              <q-timeline-entry
                      v-for="(acontecimento,index) in feed" :key="index"
                      :title=acontecimento.mensagem
                      :subtitle="acontecimento.dt_criacao"
                      avatar="data:image/png;base64,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"
              >
              </q-timeline-entry>
          </q-timeline>
      </div>

      <q-page-scroller position="bottom-right" :scroll-offset="150" :offset="[18, 18]">
          <q-btn fab icon="keyboard_arrow_up" color="primary" />
      </q-page-scroller>
  </q-page>
</template>

<script>
import { date } from 'quasar'
export default {
  name: 'Timeline',
  props: ['projeto'],
  data () {
    return {
      feed: [],
      usuarios: []
    }
  },
  created () {
    this.onreload()
  },
  methods: {
    async onreload () {
      var app = this
      var projetoRef = this.$firestore.collection('projetos').doc(this.projeto.id)
      this.$firestore.collection('timeline').where('projeto', '==', projetoRef)
        .onSnapshot(function (querySnapshot) {
          querySnapshot.forEach(function (doc) {
            let obj = doc.data()
            obj.id = doc.id
            obj.dt_criacao = date.formatDate(obj.dt_criacao, 'DD/MM/YYYY HH:mm:SS')
            app.feed.push(obj)
          })
        })
    }
  }
}
</script>

<style>
    .time{
        background-color: #ffffff;
    }
</style>
