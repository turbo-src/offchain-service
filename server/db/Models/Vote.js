import Sequelize from "sequelize";
import db from "../db.js";

const Vote = db.define("vote", {
  side: {
    type: Sequelize.STRING(),
  },
});

export default Vote;
