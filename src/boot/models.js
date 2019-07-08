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

const models = {
  user: _user
}

export default ({ app, router, Vue }) => {
  Vue.prototype.$models = models
}
