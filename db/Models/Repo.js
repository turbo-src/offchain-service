const { Sequelize } = require("sequelize");
const db = require("../db");

const Repo = db.define("repo", {
  repo_id: {
    type: Sequelize.STRING(),
    unique: true,
    allowNull: false,
  },
  head: {
    type: Sequelize.STRING(),
    defaultValue:
      "6563f8e28a947405385d56a5afd3c93e01929268e4158dba555a82d7aa5b2a8f",
  },
  tokenSupply: {
    type: Sequelize.STRING(),
  },
  quorum: {
    type: Sequelize.STRING(),
  },
});

module.exports = Repo;
