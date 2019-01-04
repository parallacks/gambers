const {
  Reservation
} = require('../models')

module.exports = {
  async index(req, res) {
    console.log('Index called')
    try {
      const reservations = await Reservation.findAll()
      res.send(reservations)
    } catch (err) {
      res.status(500).send({
        error: 'Reservations not found'
      })
    }
  },
  async show(req, res) {
    console.log('Show called')

    try {
      const reservation = await Reservation.findById(req.params.reservationId)
      res.send(reservation)
    } catch (err) {
      res.status(500).send({
        error: 'Sorry reservation not found'
      })
    }
  },
  async post(req, res) {
    console.log('Post called')
    try {
      const reservation = await Reservation.create(req.body)
      res.send(reservation)
    } catch (err) {
      res.status(500).send({
        error: 'Sorry unable to create reservation'
      })
    }
  },
  async update(req, res) {
    try {
      await Reservation.update({
        appoval: req.body.appoval
      }, {
        where: {
          id: req.params.reservationId
        }
      }).then(reservation = await Reservation.findById(req.params.reservationId))
      res.send(reservation)
    } catch (err) {
      res.status(500).send({
        error: 'Unable to save changes to the Reservation.',
        errors: err
      })
    }
  }
}
