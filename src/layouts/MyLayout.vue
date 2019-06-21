<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          @click="leftDrawerOpen = !leftDrawerOpen"
          aria-label="Menu"
        >
          <q-icon name="menu" />
        </q-btn>

        <q-toolbar-title>
         <div clickable tag="a" @click="timeline" ></div>
        4Steps
        </q-toolbar-title>

        <div></div>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      bordered
      content-class="bg-grey-2"
    >
      <div style="padding-top: 5px;" class="flex flex-center">
          <q-avatar v-if="$auth.currentUser.photoURL" size="100px">
            <q-img :src="$auth.currentUser.photoURL" />
          </q-avatar>
          <q-icon v-else name="person" class="text-blue-12" style="font-size: 6rem;" />
      </div>
      <div class="text-center">
          <span class="block">{{user.nome}}</span>
          <span class="block">{{user.email}}</span>
          <conta-edit :contaEditOpen="contaEditOpen"></conta-edit>
      </div>

      <q-list>
        <q-item-label header>Opções</q-item-label>
          <q-item clickable tag="a" @click="timeline"  >
              <q-item-section avatar>
                  <q-icon name="timeline" />
              </q-item-section>
              <q-item-section>
                  <q-item-label>Timeline</q-item-label>
              </q-item-section>
          </q-item>
        <q-item clickable to="/projeto" tag="a" >
          <q-item-section avatar>
            <q-icon name="school" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Projetos</q-item-label>
            <q-item-label caption>Meus Projetos</q-item-label>
          </q-item-section>
        </q-item>
        <q-item clickable tag="a">
          <q-item-section avatar>
            <q-icon name="help" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Ajuda</q-item-label>
            <q-item-label caption>Central de ajuda</q-item-label>
          </q-item-section>
        </q-item>
        <q-item clickable tag="a" @click="logout"  >
          <q-item-section avatar>
            <q-icon name="logout" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Sair</q-item-label>
            <q-item-label caption>Clique aqui para fechar a sessão</q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
    </q-drawer>
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { openURL } from 'quasar'
import ContaEdit from '../components/user/conta-edit'

export default {
  name: 'MyLayout',
  components: { ContaEdit },
  data () {
    return {
      leftDrawerOpen: false,
      contaEditOpen: false,
      // leftDrawerOpen: this.$q.platform.is.desktop
      user: {
        email: 'teste@teste.com',
        nome: 'Teste'
      }
    }
  },
  created () {
    if (this.$auth.currentUser != null) {
      this.user.email = this.$auth.currentUser.email
      this.user.nome = this.$auth.currentUser.displayName
    }
  },
  methods: {
    openURL,
    logout () {
      var app = this
      this.$auth.signOut().then(function () {
        app.$router.replace('/login')
      })
    },
    timeline () {
      this.$router.replace('/timeline')
    }
  }
}
</script>

<style>
</style>
