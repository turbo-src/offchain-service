import Sequelize from "/usr/local/node_modules/sequelize/lib/index.js";
import db from "../db.js";

const PullRequest = db.define("pullRequest", {
  pr_id: {
    type: Sequelize.STRING(),
  },
  title: {
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

export default PullRequest;
