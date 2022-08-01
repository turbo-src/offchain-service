import express from "express";
import { graphqlHTTP } from "express-graphql";
import { buildSchema } from "graphql";
import { db } from "./db/index.js";

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
    createUser(owner: String, repo: String, contributor_id: String, contributor_name: String, contributor_signature: String): String,
    getContributorName(owner: String, repo: String, pr_id: String, contributor_id: String): String,
    getContributorID(owner: String, repo: String, pr_id: String, contributor_name: String): String,
    getContributorSignature(owner: String, repo: String, pr_id: String, contributor_id: String): String,
    transferTokens(owner: String, repo: String, from: String, to: String, amount: String): String,
    setVote(owner: String, repo: String, pr_id: String, contributor_id: String, side: String): String,
    createRepo(owner: String, repo: String, pr_id: String, contributor_id: String, side: String): String,
    createPullRequest(owner: String, repo: String, pr_id: String, contributor_id: String, side: String): String,
    getPRVoteStatus(owner: String, repo: String, pr_id: String, contributor_id: String, side: String): String,
    getVoteYesTotals(owner: String, repo: String, pr_id: String, contributor_id: String, side: String): String,
    getVoteNoTotals(owner: String, repo: String, pr_id: String, contributor_id: String, side: String): String,
    getRepoStatus(repo_id: String): String,
    getAuthorizedContributor(contributor_id: String, repo_id: String): Boolean,
  }
`);

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

const app = express();

app.use(
  "/graphql",
  graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true,
  })
);

app.listen(4000);
console.log("Running a GraphQL API server at localhost:4000/graphql");

try {
  //Will delete data from db every time with force: true
  await db.sync({ force: true });
  await db.authenticate();
  console.log(
    "Connection to the Postgres database has been established successfully."
  );
} catch (error) {
  console.error("Unable to connect to the Postgres database:", error);
}
