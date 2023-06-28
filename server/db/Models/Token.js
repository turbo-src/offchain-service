const { Sequelize } = require("sequelize");
const db = require("../db");

const Token = db.define("token", {
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
});

module.exports = Token;
