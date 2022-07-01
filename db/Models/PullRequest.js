const { Sequelize } = require("sequelize");
const db = require("../db");

const PullRequest = db.define("pullRequest", {
  pr_id: {
    type: Sequelize.STRING(),
  },
  status: {
    type: Sequelize.STRING(),
  },
  yesTokeAmount: {
    type: Sequelize.STRING(),
  },
  noTokenAmount: {
    type: Sequelize.STRING(),
  },
});

module.exports = PullRequest;
