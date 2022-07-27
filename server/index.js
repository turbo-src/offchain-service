const express = "/usr/local/node_modules/express/index.js";
const { graphqlHTTP } = "/usr/local/node_modules/express-graphql/index.js";
const { buildSchema } = "/usr/local/node_modules/graphql/index.js";
const superagent = "/usr/local/node_modules/superagent/dist/superagent.js";

import {
  createPullRequest,
  createRepo,
  createUser,
  getAuthorizedContributor,
  getContributorID,
  getContributorName,
  getContributorTokenAmount,
  getPrStatus,
  getRepoTokenAmount,
  getRepoStatus,
} from "../lib/index.js";

var schema = buildSchema(`
  type PullRequest {
    vote_code: [String]
  }
  type Query {
    getContributorTokenAmount(owner: String, repo: String, pr_id: String, contributor_id: String, side: String): String,
    createUser(owner: String, repo: String, contributor_id: String, contributor_name: String, contributor_signature: String): String,
    getContributorName(owner: String, repo: String, pr_id: String, contributor_id: String): String,
    getContributorID(owner: String, repo: String, pr_id: String, contributor_name: String): String,
    getContributorSignature(owner: String, repo: String, pr_id: String, contributor_id: String): String,
    transferTokens(owner: String, repo: String, from: String, to: String, amount: String): String,
    pullFork(owner: String, repo: String, pr_id: String, contributor_id: String): String,
    getPRforkStatus(owner: String, repo: String, pr_id: String, contributor_id: String): String,
    getVote(pr_id: String, contributor_id: String): String,
    getVoteAll(pr_id: String): PullRequest,
    getVoteEverything: String,
    setVote(owner: String, repo: String, pr_id: String, contributor_id: String, side: String): String,
    createRepo(owner: String, repo: String, pr_id: String, contributor_id: String, side: String): String,
    newPullRequest(owner: String, repo: String, pr_id: String, contributor_id: String, side: String): String,
    getPRvoteStatus(owner: String, repo: String, pr_id: String, contributor_id: String, side: String): String,
    getPRvoteTotals(owner: String, repo: String, pr_id: String, contributor_id: String, side: String): String,
    getPRvoteYesTotals(owner: String, repo: String, pr_id: String, contributor_id: String, side: String): String,
    getPRvoteNoTotals(owner: String, repo: String, pr_id: String, contributor_id: String, side: String): String,
    getRepoStatus(repo_id: String): Boolean,
    getAuthorizedContributor(contributor_id: String, repo_id: String): Boolean,
    verifyPullRequest(pr_id: String): String,
    createPullRequest(owner: String, repo: String, fork_branch: String, pr_id: String, title: String): String,
    closePullRequest(owner: String, repo: String, pr_id: String, contributor_id: String, side: String): String,
    mergePullRequest(owner: String, repo: String, pr_id: String, contributor_id: String, side: String): String,
    fork(owner: String, repo: String, org: String): String,
  }
`);

// root 'method' for query.
var root = {
  createUser: async (args) => {
    return await createUser(args);
  },
  getContributorName: async (args) => {
    return await getContributorName(args);
  },
  getContributorID: async (args) => {
    return await getContributorID(args);
  },
  getContributorSignature: async (args) => {
    return await getContributorSignature;
  },
  getContributorTokenAmount: async (args) => {
    return await getContributorTokenAmount(args);
  },
  transferTokens: async (args) => {
    return await transferTokens(args);
  },
  verifyPullRequest: async (arg) => {
    // Check if it's in our database
    // If not, fetch it.
    // redis.get(sha256)
    //return status
    //return fakeTurboSrcReposDB.includes(arg.repo_id)
  },
  getRepoStatus: async (args) => {
    return await getRepoStatus(args);
  },
  getAuthorizedContributor: async (args) => {
    return getAuthorizedContributor(args);
  },
  getPrStatus: async (args) => {
    return await getPrStatus(args);
  },
  getPRpercentVotedQuorum: async (args) => {
    const voteTotals = getPRvoteTotals(args);
  },
  getPRvoteYesTotals: async (args) => {
    return getVoteYesTotals(args);
  },
  getPRvoteNoTotals: async (args) => {
    return getVoteNoTotals(args);
  },
  getPRvoteTotals: async (args) => {
    return getPRvoteTotals(args);
  },
  setVote: async (args) => {
    return await setVote(args);
  },
  newPullRequest: async (args) => {
    return await createPullRequest(args);
  },
  createRepo: async (args) => {
    return await createRepo(args);
  },
};

var app = express();

app.use(cors());

app.use(
  "/graphql",
  graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true,
  })
);

app.listen(8080);
console.log("Running a GraphQL API server at localhost:4000/graphql");
