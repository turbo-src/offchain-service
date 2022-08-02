const express = require("express");
const { graphqlHTTP } = require("express-graphql");
const { buildSchema } = require("graphql");
const { db } = require("./db");

const {
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
} = require("../lib");

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
    getPRStatus(owner: String, repo: String, pr_id: String, contributor_id: String, side: String): String,
    getVoteYesTotals(owner: String, repo: String, pr_id: String, contributor_id: String, side: String): String,
    getVoteNoTotals(owner: String, repo: String, pr_id: String, contributor_id: String, side: String): String,
    getRepoStatus(repo_id: String): String,
    getAuthorizedContributor(contributor_id: String, repo_id: String): Boolean,
  }
`);

var root = {
  createUser: async (args) => {
    return await createUser(
      args.owner,
      args.repo,
      args.contributor_id,
      args.contributor_name,
      args.contributor_signature
    );
  },
  getContributorName: async (args) => {
    return await getContributorName(
      args.owner,
      args.repo,
      args.pr_id,
      args.contributor_id
    );
  },
  getContributorID: async (args) => {
    let contributorID = await getContributorID(
      args.owner,
      args.repo,
      args.pr_id,
      args.contributor_name
    );
    return contributorID;
  },
  getContributorSignature: async (args) => {
    return await getContributorSignature(
      args.owner,
      args.repo,
      args.pr_id,
      args.contributor_id
    );
  },
  getContributorTokenAmount: async (args) => {
    return await getContributorTokenAmount(
      args.owner,
      args.repo,
      args.pr_id,
      args.contributor_id,
      args.side
    );
  },
  transferTokens: async (args) => {
    return await transferTokens(
      args.owner,
      args.repo,
      args.from,
      args.to,
      args.amount
    );
  },
  getRepoStatus: async (args) => {
    return await getRepoStatus(args.repo_id);
  },
  getAuthorizedContributor: async (args) => {
    return getAuthorizedContributor(args.contributor_id, args.repo_id);
  },
  getPRStatus: async (args) => {
    return await getPRStatus(
      args.owner,
      args.repo,
      args.pr_id,
      args.contributor_id,
      args.side
    );
  },
  getPRvoteYesTotals: async (args) => {
    return getVoteYesTotals(
      args.owner,
      args.repo,
      args.pr_id,
      args.contributor_id,
      args.side
    );
  },
  getPRvoteNoTotals: async (args) => {
    return getVoteNoTotals(
      args.owner,
      args.repo,
      args.pr_id,
      args.contributor_id,
      args.side
    );
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

app.listen(4000);
console.log("Running a GraphQL API server at localhost:4000/graphql");

app.use(
  "/graphql",
  graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true,
  })
);

try {
  //Will delete data from db every time with force: true
  db.sync({ force: true });
  db.authenticate();
  console.log(
    "Connection to the Postgres database has been established successfully."
  );
} catch (error) {
  console.error("Unable to connect to the Postgres database:", error);
}
