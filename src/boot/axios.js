import axios from 'axios'

export const AXIOS = axios

export default async ({ Vue }) => {
  Vue.prototype.$axios = axios
}
