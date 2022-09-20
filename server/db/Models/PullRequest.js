const { Sequelize } = require("sequelize");
const db = require("../db");
const Repo = require("./Repo");

const PullRequest = db.define(
  "pullrequest",
  {
    pr_id: {
      type: Sequelize.STRING(),
    },
    fork_branch: {
      type: Sequelize.STRING(),
    },
    title: {
      type: Sequelize.STRING(),
    },
    state: {
      type: Sequelize.STRING(),
      defaultValue: "closed",
    },
    defaultHash: {
      type: Sequelize.STRING(),
    },
    childDefaultHash: {
      type: Sequelize.STRING(),
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
      afterUpdate: async (pr) => {
        const repo = await Repo.findOne({ where: { repo_id: pr.repo_id } });
        const quorum = repo.quorum;
        const voteTotals = Number(pr.yesTokenAmount) + Number(pr.noTokenAmount);
        const percentVoted = voteTotals / 1000000;

        if (percentVoted >= quorum && pr.defaultHash === pr.childDefaultHash) {
          const yesRatio = pr.yesTokenAmount / pr.noTokenAmount;
          if (yesRatio > 1) {
            await PullRequest.update(
              { state: "merge" },
              { where: { id: pr.id } }
            );
          } else {
            await PullRequest.update(
              { state: "close" },
              { where: { id: pr.id } }
            );
          }
        } else if (pr.defaultHash !== pr.childDefaultHash) {
            await PullRequest.update(
              { state: "conflict" },
              { where: { id: pr.id } }
            );
        } else {
          await PullRequest.update(
            { state: "open" },
            { where: { id: pr.id } }
          );
        }
      },
    },
  }
);

module.exports = PullRequest;
