import Api from '../services/Api'

export default {
  index () {
    return Api().get('trips')
  },
  post (trip) {
    return Api().post('trips', trip)
  },
  show (tripId) {
    return Api().get(`trips/${tripId}`)
  }
}
