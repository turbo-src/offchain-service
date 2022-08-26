const { Sequelize } = require("sequelize");
const db = require("../db");

const Vote = db.define("vote", {
  contributor_id: {
    type: Sequelize.STRING(),
  },
  pr_id: {
    type: Sequelize.STRING(),
  },
  side: {
    type: Sequelize.STRING(),
  },
});

module.exports = Vote;
