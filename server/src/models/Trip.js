module.exports = (sequelize, DataTypes) => {
  const Trip = sequelize.define('Trip', {
    name: DataTypes.STRING,
    destination: DataTypes.STRING,
    departure_city: DataTypes.STRING,
    start_date: DataTypes.DATE,
    end_date: DataTypes.DATE,
    trip_type: DataTypes.STRING,
    location_image_url: DataTypes.STRING,
    description: DataTypes.STRING,
    trip_size: DataTypes.SMALLINT,
    active: DataTypes.BOOLEAN
  })

  return Trip
}
