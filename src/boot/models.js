/* eslint-disable eqeqeq */
import * as firebase from './firebase'
import * as constante from './constante'
import { Loading } from 'quasar'

const _user = {
  login: async (email, password) => {
    let logged = false
    Loading.show()
    await firebase.AUTH.setPersistence('session').then(function () {
      firebase.AUTH.signInWithEmailAndPassword(email, password).then(async (user) => {
        Loading.hide()
        await _user.updateCurrentUserToUsuarioByEmail(user.user)
        logged = true
      }).catch((err) => {
        constante.Notificar.error(err.message)
        Loading.hide()
      })
    }).catch((err) => {
      Loading.hide()
      constante.Notificar.error(err.message)
    })
    return logged
  },
  account: async (nome, email, password) => {
    let created = false
    Loading.show()
    await firebase.AUTH.createUserWithEmailAndPassword(email, password).then((user) => {
      if (user.user) {
        user.user.updateProfile({
          displayName: nome
        }).then(function () {
          constante.Notificar.success('Conta criada com sucesso')
          Loading.hide()
          created = user.user
        }).catch((err) => {
          constante.Notificar.error(err.message)
        })
      }
    }).catch((err) => {
      Loading.hide()
      if (err.code.toString() === 'auth/email-already-in-use') {
        constante.Notificar.error('Este email já está cadastrado')
      }
    })
    return created
  },
  updateCurrentUserToUsuarioByEmail: async (user) => {
    Loading.hide()
    await firebase.FIRESTORE.collection('usuarios').where('email', '==', user.email).get().then(function (query) {
      if (query.docs.length === 0) {
        firebase.FIRESTORE.collection('usuarios').doc(user.uid).set(user.toJSON())
      } else {
        firebase.FIRESTORE.collection('usuarios').doc(user.uid).update(user.toJSON())
      }
    }).catch((err) => {
      Loading.hide()
      constante.Notificar.error(err.message)
    })
  }
}

const _recurso = {
  adicionar: (payload) => {
    Loading.show()
    firebase.FIRESTORE.collection('recursos').doc().set(payload).then(
      function () {
        Loading.hide()
        constante.Notificar.success('Recurso adicionado com sucesso')
      }
    ).catch((err) => { Loading.hide(); constante.Notificar.error(err.message) })
  },
  editar: (id, payload) => {
    Loading.show()
    firebase.FIRESTORE.collection('recursos').doc(id).update(payload).then(
      function () {
        Loading.hide()
        constante.Notificar.success('Recurso alterado com sucesso')
      }
    ).catch((err) => { Loading.hide(); constante.Notificar.error(err.message) })
  },
  list: async (idProjeto) => {
    Loading.show()
    let recursos = []
    console.log(idProjeto)
    await firebase.FIRESTORE.collection('recursos').where('projeto_id', '==', idProjeto).get().then(
      function (query) {
        Loading.hide()
        query.docs.forEach((doc) => {
          let recurso = doc.data()
          recurso.id = doc.id
          recursos.push(recurso)
        })
      }
    ).catch((err) => { Loading.hide(); constante.Notificar.error(err.message) })
    return recursos
  }
}

const _tipoRecurso = {
  list: [
    {
      label: 'Recurso de Trabalho',
      id: 'ztcxIcvBpYMZOPWDSxqo',
      icon: 'rowing'
    },
    {
      label: 'Recurso Material',
      id: 'gVLfM4kRENodgVI7XFWK',
      icon: 'layers'
    },
    {
      label: 'Recurso de Custo',
      id: 'j24nWQIVwFKB1riHntaH',
      icon: 'attach_money'
    }
  ],
  get: (id) => {
    let tipos = _tipoRecurso.list.filter(function (tipo) {
      return tipo.id === id
    })
    console.log(tipos[0])
    return tipos.length > 0 ? tipos[0] : null
  }
}

const _dadosFixos = {
  statusRecursos: [
    { id: 0, color: 'green', nome: 'Disponível' },
    { id: 1, color: 'orange', nome: 'Fazer' },
    { id: 2, color: 'red', nome: 'Comprar' }
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
  ],
  getStatusRecurso: (id) => {
    let status = _dadosFixos.statusRecursos.filter(function (std) {
      return std.id == id
    })
    return status.length > 0 ? status[0] : null
  }
}

const models = {
  user: _user,
  recurso: _recurso,
  tipo_recurso: _tipoRecurso,
  dadosFixos: _dadosFixos
}

export default ({ app, router, Vue }) => {
  Vue.prototype.$models = models
}
