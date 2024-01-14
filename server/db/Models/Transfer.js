const { Sequelize } = require('sequelize')
const db = require('../db')

const Transfer = db.define('transfer', {
    to: {
        type: Sequelize.STRING(),
    },
    from: {
        type: Sequelize.STRING(),
    },
    repo_id: {
        type: Sequelize.STRING(),
    },
    amount: {
        type: Sequelize.INTEGER(),
    },
})

module.exports = Transfer
