const {User} = require('../models')

module.exports = {
  async index (req, res) {
    try {
      const users = await User.findAll()
      res.send(users)
    } catch (err) {
      res.status(500).send({
        error: 'Users not found'
      })
    }
  },
  async show (req, res) {
    try {
      const user = await User.findById(req.params.userId)
      res.send(user)
    } catch (err) {
      res.status(500).send({
        error: 'User not found'
      })
    }
  },
  async update (req, res) {
    try {
       await User.update(
        {first_name: req.body.first_name,
          last_name: req.body.last_name,
          email: req.body.email,
          phone_number: req.body.phone_number,
          street_address: req.body.street_address,
          city: req.body.city,
          state: req.body.state,
          zip_code: req.body.zip_code,
          card_name: req.body.card_name,
          card_number: req.body.card_number,
          access_level: req.body.access_level
          },
        {where: {id: req.params.userId} }
      ).then(user = await User.findById(req.params.userId))
        res.send(user)
    } catch (err) {
      res.status(500).send({ error: 'Unable to save changes to the user.',
                            errors: err})
    }
  }
}
