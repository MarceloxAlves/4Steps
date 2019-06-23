import { Notify, Dialog } from 'quasar'

export const Notificar = {
  success: function (msg) {
    Notify.create({
      color: 'positive',
      position: 'bottom-right',
      message: msg,
      timeout: 2500,
      textColor: 'white',
      actions: [{ icon: 'close', color: 'white' }]
    })
  },
  error: function (msg) {
    Notify.create({
      color: 'negative',
      position: 'bottom-right',
      message: msg,
      timeout: 2500,
      textColor: 'white',
      actions: [{ icon: 'close', color: 'white' }]
    })
  },
  confirm: function (title, message) {
    return new Promise(function (resolve, reject) {
      Dialog.create({
        title: title,
        message: message,
        ok: {
          push: true
        },
        cancel: {
          push: true,
          color: 'negative',
          label: 'Cancelar'
        },
        persistent: true
      }).onOk(() => {
        resolve('ok')
      }).onCancel(() => {
        reject('cancelou')
      }).onDismiss(() => {
        console.log('I am triggered on both OK and Cancel')
      })
    })
  }
}

export default ({ Vue }) => {
  Vue.prototype.$msg = Notificar
}
