const { Sequelize } = require("sequelize");
const db = require("../db");

const Token = db.define("token", {
  from: {
    type: Sequelize.STRING(),
  },
  amount: {
    type: Sequelize.STRING(),
  },
});

module.exports = Token;
