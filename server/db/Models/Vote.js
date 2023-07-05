const { Sequelize } = require("sequelize");
const db = require("../db");

const Vote = db.define("vote", {
  contributor_id: {
    type: Sequelize.STRING(),
  },
  defaultHash: {
    type: Sequelize.STRING(),
  },
  side: {
    type: Sequelize.BOOLEAN(),
  },
  votePower: {
    type: Sequelize.STRING(),
  }
});

module.exports = Vote;
