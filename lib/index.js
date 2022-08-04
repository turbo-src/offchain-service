const createPullRequest = require("./createPullRequest");
const createRepo = require("./createRepo");
const createUser = require("./createUser");
const getAuthorizedContributor = require("./getAuthorizedContributor");
const getContributorID = require("./getContributorID");
const getContributorName = require("./getContributorName");
const getContributorTokenAmount = require("./getContributorTokenAmount");
const getPRStatus = require("./getPRStatus");
const getRepoTokenAmount = require("./getRepoTokenAmount");
const getRepoStatus = require("./state/getRepoStatus");
const getVoteNoTotals = require("./state/getVoteNoTotals");
const getVoteYesTotals = require("./state/getVoteYesTotals");
const setVote = require("./setVote");
const transferTokens = require("./transferTokens");
const getVoteStatus = require("./state/getVoteStatus");
const getQuorum = require("./state/getQuorum");
const setQuorum = require("./state/setQuorum");
const getVoteTotals = require("./state/getVoteTotals");

module.exports = {
  createPullRequest,
  createRepo,
  createUser,
  getAuthorizedContributor,
  getContributorID,
  getContributorName,
  getContributorTokenAmount,
  getPRStatus,
  getRepoTokenAmount,
  getRepoStatus,
  getVoteNoTotals,
  getVoteYesTotals,
  setVote,
  transferTokens,
  getVoteStatus,
  getQuorum,
  setQuorum,
  getVoteTotals,
};
