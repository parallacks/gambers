const {Topic} = require('../models')
module.exports = (sequelize, DataTypes) => {
  const Question = sequelize.define('Question', {
    question: DataTypes.STRING
  })
  // Question.hasOne(Topic)
  return Question
}
