const { Sequelize } = require("sequelize");
const db = require("../db");
const { getPRVoteTotals } = require("../lib");

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
        const quorum = getQuorum(pr.repo_id);
        const voteTotals = getPRVoteTotals(args); //
        const percentVoted = Number(voteTotals.totalVotedTokens) / 1000000;

        if (percentVoted >= quorum) {
          const yesRatio =
            Number(voteTotals.totalVotedYesTokens) /
            Number(voteTotals.totalVotedNoTokens);

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
