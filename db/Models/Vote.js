const { Sequelize } = require("sequelize");
const db = require("../db");

const Vote = db.define("vote", {
  side: {
    type: Sequelize.STRING(),
  },
});

module.exports = Vote;
