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
      <div class="row text-center">
        <div class="col-md-12">
          <q-icon name="person" class="text-blue-12" style="font-size: 6rem;" />
        </div>
      </div>
        <div class="flex flex-block flex-center">
          <p>{{user.nome}}</p>
          <p>{{user.email}}</p>
          <conta-edit :contaEditOpen="contaEditOpen"></conta-edit>
      </div>

      <q-list>
        <q-item-label header>Opções</q-item-label>
        <q-item clickable tag="a" >
          <q-item-section avatar>
            <q-icon name="school" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Projetos</q-item-label>
            <q-item-label caption>Meus Projetos</q-item-label>
          </q-item-section>
        </q-item>
        <q-item clickable tag="a" target="_blank" >
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
    }
  }
}
</script>

<style>
</style>
