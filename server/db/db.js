const { Sequelize } = require('sequelize')

const dbUrl =
  process.env.DATABASE_URL ||
  process.env.DOCKER_DATABASE_URL ||
  'postgres://localhost:5432/privatestore'

const config = {
    logging: false,
}

const db = new Sequelize(dbUrl, config)

module.exports = db
