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
  transferTokens,
  getContributorSignature,
  getContributorName,
  getContributorTokenAmount,
  getPRStatus,
  getRepoStatus,
  getVoteTotals,
  getVoteYesTotals,
  getVoteNoTotals,
  setQuorum,
  getQuorum,
  setVote,
} = require("../lib");

var schema = buildSchema(`
  type Query {
    createUser(owner: String, repo: String, contributor_id: String, contributor_name: String, contributor_signature: String): String,
    createRepo(owner: String, repo: String, pr_id: String, contributor_id: String, side: String): String,
    createPullRequest(owner: String, repo_id: String, pr_id: String, fork_branch: String, title: String): String,
    getContributorName(owner: String, repo: String, pr_id: String, contributor_id: String): String,
    getContributorID(owner: String, repo_id: String, pr_id: String, contributor_name: String): String,
    getContributorSignature(owner: String, repo: String, pr_id: String, contributor_name: String): String,
    getRepoStatus(owner: String, repo_id: String, pr_id: String, contributor_id: String, side: String): String,
    getAuthorizedContributor(contributor_id: String, repo_id: String): Boolean,
    getContributorTokenAmount(owner: String, repo_id: String, pr_id: String, contributor_id: String, side: String): String,
    transferTokens(owner: String, repo_id: String, from: String, to: String, amount: String): String,
    setVote(owner: String, repo_id: String, pr_id: String, contributor_id: String, side: String): String,
    getPRStatus(owner: String, repo_id: String, pr_id: String, contributor_id: String, side: String): String,
    setQuorum(repo_id: String, contributor_id: String, quorum: String): String,
    getQuorum(repo_id: String): String,
    getVoteTotals(owner: String, repo: String, pr_id: String, contributor_id: String, side: String): String,
    getVoteYesTotals(owner: String, repo: String, pr_id: String, contributor_id: String, side: String): String,
    getVoteNoTotals(owner: String, repo: String, pr_id: String, contributor_id: String, side: String): String,
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
  createRepo: async (args) => {
    return await createRepo(
      args.owner,
      args.repo,
      args.pr_id,
      args.contributor_id,
      args.side
    );
  },
  createPullRequest: async (args) => {
    return await createPullRequest(
      args.owner,
      args.repo_id,
      args.pr_id,
      args.fork_branch,
      args.title
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
      args.repo_id,
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
      args.contributor_name
    );
  },
  getRepoStatus: async (args) => {
    return await getRepoStatus(
      args.owner,
      args.repo_id,
      args.pr_id,
      args.contributor_id,
      args.side
    );
  },
  getAuthorizedContributor: async (args) => {
    return await getAuthorizedContributor(args.contributor_id, args.repo_id);
  },
  getContributorTokenAmount: async (args) => {
    return await getContributorTokenAmount(
      args.owner,
      args.repo_id,
      args.pr_id,
      args.contributor_id,
      args.side
    );
  },
  transferTokens: async (args) => {
    return await transferTokens(
      args.owner,
      args.repo_id,
      args.from,
      args.to,
      args.amount
    );
  },
  setVote: async (args) => {
    return await setVote(
      args.owner,
      args.repo_id,
      args.pr_id,
      args.contributor_id,
      args.side
    );
  },
  getPRStatus: async (args) => {
    return await getPRStatus(
      args.owner,
      args.repo_id,
      args.pr_id,
      args.contributor_id,
      args.side
    );
  },
  setQuorum: async (args) => {
    return await setQuorum(args.repo_id, args.contributor_id, args.quorum);
  },
  getQuorum: async (args) => {
    return await getQuorum(args.repo_id);
  },
  getVoteTotals: async (args) => {
    return getVoteTotals(
      args.owner,
      args.repo,
      args.pr_id,
      args.contributor_id,
      args.side
    );
  },
  getVoteYesTotals: async (args) => {
    return getVoteYesTotals(
      args.owner,
      args.repo,
      args.pr_id,
      args.contributor_id,
      args.side
    );
  },
  getVoteNoTotals: async (args) => {
    return getVoteNoTotals(
      args.owner,
      args.repo,
      args.pr_id,
      args.contributor_id,
      args.side
    );
  },
};

const app = express();

app.listen(4002);
console.log("Running a GraphQL API server at localhost:4004/graphql");

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
