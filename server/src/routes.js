const AuthenticationController = require('./controllers/AuthenticationController.js')
const AuthenticationControllerPolicy = require('./policies/AuthenticationControllerPolicy.js')
const TripsController = require('./controllers/TripsController.js')

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
}
