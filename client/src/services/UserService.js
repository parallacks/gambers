import Api from '../services/Api'

export default {
  index () {
    return Api().get('users')
  },
  show (userId) {
    return Api().get(`users/${userId}`)
  },
  update (userId, user) {
    return Api().post(`users/${userId}`, user)
  }
}
