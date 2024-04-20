const { Sequelize } = require('sequelize');
const db = require('../db');
const Transfer = require('./Transfer');

const Repo = db.define('repo', {
  repo_id: {
    type: Sequelize.STRING(),
    unique: true,
    allowNull: false,
  },
  contributor_id: {
    type: Sequelize.STRING(),
  },
  repo_name: {
    type: Sequelize.STRING(),
    unique: true,
    allowNull: false,
  },
  head: {
    type: Sequelize.STRING(),
    defaultValue:
      '6563f8e28a947405385d56a5afd3c93e01929268e4158dba555a82d7aa5b2a8f',
  },
  tokenAmount: {
    type: Sequelize.STRING(),
    defaultValue: 1_000_000,
  },
  quorum: {
    type: Sequelize.STRING(),
    defaultValue: '.5',
  },
  inSession: {
    type: Sequelize.BOOLEAN(),
    defaultValue: false,
  },
});

const initialBalance = async (Repo) => {
  await Transfer.create({
    from: Repo.contributor_id,
    to: Repo.contributor_id,
    repo_id: Repo.repo_id,
    amount: Repo.tokenAmount,
  });
};

Repo.afterCreate(initialBalance);
module.exports = Repo;
