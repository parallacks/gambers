const Promise = require('bluebird')
const bcrypt = Promise.promisifyAll(require('bcryptjs'))

function hashPassword (user, options){
  const SALT_FACTOR = 8

  if (!user.changed('password')){
    return
  }
  return bcrypt
    .hash(user.password, SALT_FACTOR, null)
    .then(hash => {
      user.setDataValue('password', hash)
    })

}

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    username: {
      type: DataTypes.STRING,
      unique: true
    },
    password: DataTypes.STRING,
    email: DataTypes.STRING,
    first_name: DataTypes.STRING,
    last_name: DataTypes.STRING,
    phone_number: DataTypes.STRING,
    street_address: DataTypes.STRING,
    city: DataTypes.STRING,
    state: DataTypes.STRING,
    zip_code: DataTypes.STRING,
    card_name: DataTypes.STRING,
    card_number: DataTypes.INTEGER,
    access_level: DataTypes.SMALLINT
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
