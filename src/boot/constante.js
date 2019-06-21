export const msg = {
  success: function (msg) {
    this.$q.notify({
      color: 'positive',
      position: 'bottom-right',
      message: msg,
      timeout: 2500,
      textColor: 'white',
      actions: [{ icon: 'close', color: 'white' }]
    })
  },
  error: function (msg) {
    this.$q.notify({
      color: 'negative',
      position: 'bottom-right',
      message: msg,
      timeout: 2500,
      textColor: 'white',
      actions: [{ icon: 'close', color: 'white' }]
    })
  }
}

export default ({ Vue }) => {
  Vue.prototype.$msg = msg
}
