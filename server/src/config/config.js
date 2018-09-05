module.exports = {
  port: process.env.PORT || 8081,
  db: {
    database: process.env.DB_NAME || 'gambers',
    user: process.env.DB_USER || 'gambers',
    password: process.env.DB_PASS || 'gambers',
    options:{
      dialect: process.env.DIALECT || 'sqlite',
      host: process.env.HOST || 'localhost',
      storage: './gambers.sqlite'
    }
  }
}
