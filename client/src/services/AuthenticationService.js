import Api from '@/services/Api'

export default {
  register (credentials) {
    return Api().post('register', credentials)
  }
}

// AuthenicationService.register({
//   email: 'testing@gmail.com',
//   password: '12345'
// })
