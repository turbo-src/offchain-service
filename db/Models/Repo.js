import Sequelize from "/usr/local/node_modules/sequelize/lib/index.js";
import db from "../db.js";

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
  quorum: {
    type: Sequelize.STRING(),
  },
});
export default Repo;
