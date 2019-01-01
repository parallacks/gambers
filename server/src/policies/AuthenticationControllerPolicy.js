const Joi = require('joi')


module.exports = {
  register (req, res, next){
    console.log('policy is called')
    const schema = {
      username: Joi.string().regex(
        new RegExp('^[a-zA-Z0-9]{8,32}$')
      ),
      password: Joi.string().regex(
        new RegExp('^[a-zA-Z0-9]{8,32}$')
      )
    }
    const {error, value} = Joi.validate(req.body, schema)

    if (error){
      switch (error.details[0].context.key){
        case 'email':
          res.status(400).send({
            error: 'You must provide a valid email address'
          })
          break
        case 'username':
          res.status(400).send({
            error: 'Your username must contain 8-32 alphanumerical characters'
          })
          break
        case 'password':
          res.status(400).send({
            error: 'Your password must contain 8-32 alphanumerical characters'
          })
          break
        default:
          res.status(400).send({
            error: 'Something went wrong'
          })
      }
    } else {
      next()
    }
    console.log('end of policy')
  }
}
