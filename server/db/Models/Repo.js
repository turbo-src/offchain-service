import Sequelize from "sequelize";
import db from "../db.js";
import Token from "./Token.js";

const Repo = db.define("repo", {
  owner: {
    type: Sequelize.STRING(),
    allowNull: false,
  },
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
  tokenAmount: {
    type: Sequelize.STRING(),
    defaultValue: "1000000",
  },
  contributor_id: {
    type: Sequelize.STRING(),
  },
  quorum: {
    type: Sequelize.STRING(),
  },
});

const initialBalance = async (Repo) => {
  await Token.create({
    from: Repo.contributor_id,
    to: Repo.contributor_id,
    repo_id: Repo.repo_id,
    amount: Repo.tokenAmount,
  });
};

Repo.afterCreate(initialBalance);

export default Repo;
