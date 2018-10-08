module.exports = (sequelize, DataTypes) => {
  const Trip = sequelize.define('Trip', {
    name: DataTypes.STRING,
    location: DataTypes.STRING,
    minPlayerRating: DataTypes.SMALLINT,
    startDate: DataTypes.DATE,
    endDate: DataTypes.DATE,
    locationImageURL: DataTypes.STRING,
    description: DataTypes.STRING,
    tripSize: DataTypes.SMALLINT,
    active: DataTypes.BOOLEAN
  })

  return Trip
}
