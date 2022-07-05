import Sequelize from "/usr/local/node_modules/sequelize/lib/index.js";
import db from "../db.js";

const Vote = db.define("vote", {
  side: {
    type: Sequelize.STRING(),
  },
});

export default Vote;
