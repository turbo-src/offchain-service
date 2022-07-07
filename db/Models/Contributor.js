import Sequelize from "/usr/local/node_modules/sequelize/lib/index.js";
import db from "../db.js";

const Contributor = db.define("contributor", {
  contributor_id: {
    type: Sequelize.STRING(),
  },
  contributor_name: {
    type: Sequelize.STRING(),
  },
  tokenAmount: {
    type: Sequelize.STRING(),
  },
  contributor_signature: {
    type: Sequelize.STRING(),
  },
});

export default Contributor;
