const AuthenticationController = require('./controllers/AuthenticationController.js')
const AuthenticationControllerPolicy = require('./policies/AuthenticationControllerPolicy.js')
const TripsController = require('./controllers/TripsController.js')
const UserController = require('./controllers/UserController.js')
const ReservationController = require('./controllers/ReservationController')

module.exports = (app) => {
  app.post('/register',
    AuthenticationControllerPolicy.register,
    AuthenticationController.register)

  app.post('/login',
    AuthenticationController.login)

  app.get('/trips',
    TripsController.index)
  app.get('/trips/:tripId',
    TripsController.show)
  app.post('/trips',
    TripsController.post)
  app.get('/users',
    UserController.index)
  app.get('/users/:userId',
    UserController.show)
  app.post('/users/:userId',
    UserController.update)
  app.get('/reservation',
    ReservationController.index)
  app.get('/reservation/:reservationId',
    ReservationController.show)
  app.post('/reservation',
    ReservationController.post)
  app.post('reservation/:reservationId',
    ReservationController.post)
}
