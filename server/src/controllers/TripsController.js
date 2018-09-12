const {Trip} = require('../models')

module.exports = {
  async index (req, res) {
    try {
      const trips = await Trip.findAll({
        limit: 10
      })
      res.send(trips)
    } catch (err) {
      res.status(400).send({
        error: 'Trips not found'
      })
    }
  },
  async post (req, res) {
    try {
      const trip = await Trip.create(req.body)
      res.send(trip)
    } catch(err) {
      res.status(400).send({
        error: 'Unable to create trip'
      })
    }
  }
}