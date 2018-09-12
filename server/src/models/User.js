const Promise = require('bluebird')
const bcrypt = Promise.promisifyAll(require('bcryptjs'))

function hashPassword (user, options){
  const SALT_FACTOR = 8

  if(!user.changed('password')){
    return;
  }
  return bcrypt
    .hash(user.password, SALT_FACTOR, null)
    .then(hash => {
      user.setDataValue('password', hash)
    })

}

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    email: {
      type: DataTypes.STRING,
      unique: true
    },
    password: DataTypes.STRING
  }, {
    hooks: {
      beforeSave: hashPassword,
    }
  })

  User.prototype.comparePassword = function (password) {
    return bcrypt.compare(password, this.password)
  }

  return User
}
