const {Trip} = require('../models')

module.exports = {
  async index (req, res) {
    try {
      const trips = await Trip.findAll({
        limit: 10
      })
      res.send(trips)
    } catch (err) {
      res.status(500).send({
        error: 'Trips not found'
      })
    }
  },
  async show (req, res) {
    try {
      const trip = await Trip.findById(req.params.tripId)
      console.log('This is working fine')
      res.send(trip)
    } catch (err) {
      res.status(500).send({
        error: 'Trip not found'
      })
    }
  },
  async post (req, res) {
    try {
      const trip = await Trip.create(req.body)
      res.send(trip)
    } catch(err) {
      res.status(500).send({
        error: 'Unable to create trip'
      })
    }
  },
  async update (req, res) {
    console.log('Update called')
    try {
      await Trip.update(
        {
          name: req.body.name,
          destination: req.body.destination,
          departure_city: req.body.departure_city,
          start_date: req.body.start_date,
          end_date: req.body.end_date,
          trip_type: req.body.trip_type,
          location_image_url: req.body.location_image_url,
          description: req.body.description,
          trip_size: req.body.trip_size,
          active: req.body.active
        },
        {where: {id: req.params.tripId} }
      ).then(trip = await Trip.findById(req.params.tripId))
      console.log('Got here?')
      res.send(trip)
    } catch (err) {
      res.status(500).send({ error: 'Unable to save changes to the trip.',
                            errors: err})
    }
  }
}
