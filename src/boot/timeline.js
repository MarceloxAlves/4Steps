import { FIRESTORE, AUTH } from './firebase'
// import { Notificar } from './constante'

const timeline = {
  register: function (mensagem, linkProjeto, linkObjeto) {
    FIRESTORE.collection('timeline').doc().set({
      mensagem: mensagem,
      projeto: linkProjeto,
      objeto: linkObjeto,
      dt_criacao: new Date().getTime(),
      usuario: FIRESTORE.collection('users').doc(AUTH.currentUser.uid)
    })
      .then(function () {
        console.log('Timeline salvada com sucesso')
        // Notificar.success('Timeline salvada com sucesso')
      })
      .catch(function (err) {
        console.log('Timeline error: ' + err.message)
        // Notificar.error('Deu ruim: ' + err.message)
      })
  }
}
export default ({ Vue }) => {
  Vue.prototype.$timeline = timeline
}
