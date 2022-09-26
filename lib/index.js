const createPullRequest = require("./createPullRequest");
const createRepo = require("./createRepo");
const getAuthorizedContributor = require("./getAuthorizedContributor");
const getContributorTokenAmount = require("./getContributorTokenAmount");
const getRepoTokenAmount = require("./getRepoTokenAmount");
const getRepoStatus = require("./state/getRepoStatus");
const getPRvoteNoTotals = require("./state/getPRvoteNoTotals");
const getPRvoteYesTotals = require("./state/getPRvoteYesTotals");
const setVote = require("./setVote");
const transferTokens = require("./transferTokens");
const getPRvoteStatus = require("./getPRvoteStatus");
const getQuorum = require("./state/getQuorum");
const setQuorum = require("./state/setQuorum");
const getPRvoteTotals = require("./state/getPRvoteTotals");
const getRepo = require("./getRepo");
const mostRecentMerge = require("./mostRecentMerge")
module.exports = {
  createPullRequest,
  createRepo,
  getRepo,
  getAuthorizedContributor,
  getContributorTokenAmount,
  getRepoTokenAmount,
  getRepoStatus,
  getPRvoteNoTotals,
  getPRvoteYesTotals,
  setVote,
  transferTokens,
  getPRvoteStatus,
  getQuorum,
  setQuorum,
  getPRvoteTotals,
  mostRecentMerge,
};
