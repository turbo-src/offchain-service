const { Sequelize } = require("sequelize");
const db = require("../db");
const Repo = require("./Repo");

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
    branch: {
      type: Sequelize.STRING(),
    },
    head: {
      type: Sequelize.STRING(),
    },
    defaultHash: {
      type: Sequelize.STRING(),
    },
  },
  {
    hooks: {
      afterUpdate: async (pr) => {
        const repo = await Repo.findOne({ where: { repo_id: pr.repo_id } });
        const quorum = repo.quorum;
        const voteTotals = Number(pr.yesTokenAmount) + Number(pr.noTokenAmount);
        const percentVoted = voteTotals / 1000000;

        if (percentVoted >= quorum) {
          const yesRatio = pr.yesTokenAmount / pr.noTokenAmount;
          if (yesRatio > 1) {
            await PullRequest.update(
              { status: "merge" },
              { where: { id: pr.id } }
            );
          } else {
            await PullRequest.update(
              { status: "close" },
              { where: { id: pr.id } }
            );
          }
        } else {
          await PullRequest.update(
            { status: "open" },
            { where: { id: pr.id } }
          );
        }
      },
    },
  }
);

module.exports = PullRequest;
