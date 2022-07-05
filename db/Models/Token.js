import Sequelize from "/usr/local/node_modules/sequelize/lib/index.js";
import db from "../db.js";

const Token = db.define("token", {
  from: {
    type: Sequelize.STRING(),
  },
  amount: {
    type: Sequelize.STRING(),
  },
});

export default Token;
