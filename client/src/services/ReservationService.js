import Api from '../services/Api'

export default {
  index () {
    return Api().get('reservation')
  },
  post (reservation) {
    return Api().post('reservation', reservation)
  },
  show (reservationId) {
    return Api().get(`reservation/${reservationId}`)
  },
  update (reservationId, reservation) {
    return Api().post(`reservation/${reservationId}`, reservation)
  }
}
