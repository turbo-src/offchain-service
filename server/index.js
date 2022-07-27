import express from "/usr/local/node_modules/express/index.js";
import { graphqlHTTP } from "/usr/local/node_modules/express-graphql/index.js";
import { buildSchema } from "/usr/local/node_modules/graphql/index.js";
// import superagent from "/usr/local/node_modules/superagent/dist/superagent.js";

import {
  createPullRequest,
  createRepo,
  createUser,
  getAuthorizedContributor,
  getContributorID,
  getContributorName,
  getContributorTokenAmount,
  getPRStatus,
  getRepoStatus,
  getVoteYesTotals,
  getVoteNoTotals,
} from "../lib/index.js";

var schema = buildSchema(`
  type Query {
    getContributorTokenAmount(owner: String, repo: String, pr_id: String, contributor_id: String, side: String): String,
    createUser(owner: String, repo: String, contributor_id: String, contributor_name: String, contributor_signature: String): Number,
    getContributorName(owner: String, repo: String, pr_id: String, contributor_id: String): String,
    getContributorID(owner: String, repo: String, pr_id: String, contributor_name: String): String,
    getContributorSignature(owner: String, repo: String, pr_id: String, contributor_id: String): String,
    transferTokens(owner: String, repo: String, from: String, to: String, amount: String): Number,
    setVote(owner: String, repo: String, pr_id: String, contributor_id: String, side: String): Number,
    createRepo(owner: String, repo: String, pr_id: String, contributor_id: String, side: String): Number,
    createPullRequest(owner: String, repo: String, pr_id: String, contributor_id: String, side: String): String,
    getPRVoteStatus(owner: String, repo: String, pr_id: String, contributor_id: String, side: String): String,
    getVoteYesTotals(owner: String, repo: String, pr_id: String, contributor_id: String, side: String): String,
    getVoteNoTotals(owner: String, repo: String, pr_id: String, contributor_id: String, side: String): String,
    getRepoStatus(repo_id: String): Number,
    getAuthorizedContributor(contributor_id: String, repo_id: String): Boolean,
    createPullRequest(owner: String, repo: String, fork_branch: String, pr_id: String, title: String): Number,
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
  getRepoStatus: async (args) => {
    return await getRepoStatus(args);
  },
  getAuthorizedContributor: async (args) => {
    return getAuthorizedContributor(args);
  },
  getPRStatus: async (args) => {
    return await getPRStatus(args);
  },
  getPRvoteYesTotals: async (args) => {
    return getVoteYesTotals(args);
  },
  getPRvoteNoTotals: async (args) => {
    return getVoteNoTotals(args);
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
