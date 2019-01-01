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
      console.log('This is working fine')
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
        {phone_number: req.body.phone_number},
        {returning: true, where: {id: req.params.userId} }
      ).then(function ([rowsUpdated, [updatedUser] ]){
        res.send(updatedUser)
      })
    } catch (err) {
      res.status(500).send({ error: 'Unable to save changes to the user.'})
    }
  }
}
