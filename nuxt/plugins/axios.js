import Axios from 'axios'
Axios.defaults.baseURL = 'http://api.zhuliyuan123.com/api'
export default ({ app }, inject) => {
  app.$axios = Axios
}
