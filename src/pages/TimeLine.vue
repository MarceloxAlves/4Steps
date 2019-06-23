<template>
  <q-page padding>
      <div class="q-px-lg q-pb-md">
          <q-timeline color="secondary">
              <q-timeline-entry heading>
                 Aqui é o header {{projeto.nome}}
              </q-timeline-entry>

              <q-timeline-entry
                      v-for="n in 15" :key="n"
                      :title="$auth.currentUser.email"
                      subtitle="February 21, 1986"
                      avatar="https://lh3.googleusercontent.com/a-/AAuE7mCe-X3hKfmKs7h246ZPpDSY3FKcaj55AZPK9qgoVQ=s96"
              >
                  <div>
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
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
      teste: 'teste'
    }
  },
  created () {
  },
  methods: {
  }
}
</script>

<style>
    .time{
        background-color: #ffffff;
    }
</style>
