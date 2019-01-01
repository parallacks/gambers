module.exports = (sequelize, DataTypes) => {
  const Reservation = sequelize.define('Reservation', {
    user_id:DataTypes.SMALLINT,
    trip_id:DataTypes.SMALLINT,
    first_name: DataTypes.STRING,
    last_name: DataTypes.STRING,
    card_name: DataTypes.STRING,
    card_number: DataTypes.STRING,
    street_address: DataTypes.STRING,
    city: DataTypes.STRING,
    state: DataTypes.STRING,
    email: DataTypes.STRING,
    trip_destination: DataTypes.STRING,
    trip_departure: DataTypes.STRING,
    trip_start_date: DataTypes.DATE,
    trip_end_date: DataTypes.DATE,
    comment: DataTypes.STRING
  })
  return Reservation
}
