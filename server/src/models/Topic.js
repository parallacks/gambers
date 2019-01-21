module.exports = (sequelize, DataTypes) => {
  const Topic = sequelize.define('Topic', {
    topic: DataTypes.STRING
  })
  return Topic
}
