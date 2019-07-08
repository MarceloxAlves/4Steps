<template>
  <q-page padding>
      <div class="q-px-lg q-pb-md">
          <q-timeline color="secondary">
              <q-timeline-entry heading>
              </q-timeline-entry>

              <q-timeline-entry
                      v-for="(acontecimento, index) in feed" :key="index"
                      :title="acontecimento.usuario.id"
                      :subtitle="Date().valueOf(acontecimento.dt_criacao)"
                      :avatar="acontecimento.usuario.photoURL"
              >
                  <div>
                      Dunt in culpa qui officia deserunt mollit anim id est laborum.
                  </div>
              </q-timeline-entry>
          </q-timeline>
      </div>

      <q-page-scroller position="bottom-right" :scroll-offset="150" :offset="[18, 18]">
          <q-btn fab icon="keyboard_arrow_up" color="primary" />
      </q-page-scroller>
  </q-page>
</template>

<script>
export default {
  name: 'Timeline',
  props: ['projeto'],
  data () {
    return {
      feed: []
    }
  },
  created () {
    this.onreload()
  },
  methods: {
    async onreload () {
      var app = this
      var projetoRef = app.$firestore
        .collection('projetos')
        .doc(app.projeto.id)
      // await app.$firestore
      //   .collection('projetos')
      //   .doc(app.projeto.id).get().then((doc) => {
      //     projetoRef = doc
      //   })
      console.log(projetoRef)
      app.$firestore.collection('timeline').where('projeto', '==', projetoRef)
        .get()
        .then(function (querySnapshot) {
          querySnapshot.forEach(function (doc) {
            let obj = doc.data()
            obj.id = doc.id
            app.feed.push(obj)
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

<style>
    .time{
        background-color: #ffffff;
    }
</style>
