import Sequelize from "sequelize";
import db from "../db.js";

const PullRequest = db.define(
  "pullrequest",
  {
    pr_id: {
      type: Sequelize.STRING(),
    },
    title: {
      type: Sequelize.STRING(),
    },
    status: {
      type: Sequelize.STRING(),
      defaultValue: "closed",
    },
    yesTokenAmount: {
      type: Sequelize.STRING(),
      defaultValue: "0",
    },
    noTokenAmount: {
      type: Sequelize.STRING(),
      defaultValue: "0",
    },
    repo_id: {
      type: Sequelize.STRING(),
    },
  },
  {
    hooks: {
      afterUpdate: async (pr, options) => {
        if (Number(pr.yesTokenAmount) >= 500001) {
          try {
            await PullRequest.update(
              { status: "merge" },
              { where: { id: pr.id } }
            );
          } catch (error) {
            console.log(error);
          }
        } else if (Number(pr.yesTokenAmount) <= 500000) {
          await PullRequest.update(
            { status: "open" },
            { where: { id: pr.id } }
          );
        }
      },
    },
  }
);

export default PullRequest;
