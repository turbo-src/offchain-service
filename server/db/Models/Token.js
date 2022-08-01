import Sequelize from "sequelize";
import db from "../db.js";

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
    type: Sequelize.STRING(),
  },
});

export default Token;
