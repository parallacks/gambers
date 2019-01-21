const {User} = require('../models')
const jwt = require('jsonwebtoken')
const config = require('../config/config.js')

function jwtSignUser(user){
  const ONE_DAY= 60 * 60 * 24
  return jwt.sign(user, config.authentication.jwtSecret,{
    expiresIn: ONE_DAY
  })
}

module.exports = {
  async register (req, res) {
    try {
      const user = await User.create(req.body)
      const userJson = user.toJSON()
      res.send({
        user: user.toJSON(),
        token: jwtSignUser(userJson)
      })
    } catch (err) {
      // email already exists
      res.status(400).send({
        error: 'The email already has an account'
      })
    }
  },
  async login (req, res) {
    try {
      const {username, password} = req.body
      const user = await User.findOne({
        where:{
          username: username
        }
      })
      if(!user){
        return res.status(403).send({
          error: 'The login information was incorrect.'
        })
      }

      const isPasswordValid = await user.comparePassword(password)
      if(!isPasswordValid){
        return res.status(403).send({
          error: 'The login information was incorrect.'
        })
      }

      const userJson = user.toJSON()
      res.send({
        user: user.toJSON(),
        token: jwtSignUser(userJson)
      })
    } catch (err) {
      //email already exists
      res.status(500).send({
        error: 'An error has occured trying to login.'
      })
    }
  }
}
