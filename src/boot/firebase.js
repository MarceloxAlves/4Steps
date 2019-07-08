import * as firebase from 'firebase'
const firebaseConfig = {
  apiKey: 'AIzaSyCYBXkapDOuWzz_MqwOdxKBaA9SdLoDyvs',
  authDomain: 'steps-d0a6f.firebaseapp.com',
  databaseURL: 'https://steps-d0a6f.firebaseio.com',
  projectId: 'steps-d0a6f',
  storageBucket: 'steps-d0a6f.appspot.com',
  messagingSenderId: '656296469539',
  appId: '1:656296469539:web:7b6788c8ccd1e05a'
}

const fireApp = firebase.initializeApp(firebaseConfig)

export const AUTH = fireApp.auth()
export const FIRESTORE = fireApp.firestore()
export const FIREBASE = fireApp
export default ({ app, router, Vue }) => {
  Vue.prototype.$auth = AUTH
  Vue.prototype.$storage = fireApp.storage()
  Vue.prototype.$firestore = fireApp.firestore()
}
