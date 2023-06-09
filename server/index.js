const express = require("express");
const { graphqlHTTP } = require("express-graphql");
const { buildSchema } = require("graphql");
const { db } = require("./db");
require("dotenv").config();

const {
  createPullRequest,
  createLinkedPullRequest,
  updatePullRequest,
  createRepo,
  getRepo,
  getAuthorizedContributor,
  transferTokens,
  getContributorTokenAmount,
  getPullRequest,
  getMostRecentLinkedPullRequest,
  getRepoStatus,
  getPRvoteTotals,
  getPRvoteYesTotals,
  getPRvoteNoTotals,
  setQuorum,
  getQuorum,
  setVote,
  getRepoData,
  getVotes
} = require("../lib");

var schema = buildSchema(`
  type RepoStatus {
    status: Int!
    exists: Boolean!
  }

  type Vote {
    contributor_id: String!
    side: String!
    votePower: Int!
    createdAt: String!
  }

  type PullRequest {
    status: Int!
    state: String!
    repo_id: String!
    fork_branch: String!
    defaultHash: String!
    childDefaultHash: String!
    head: String!
    branchDefaultHash:String!
    remoteURL: String!
    baseBranch: String!
    votes: [Vote]!
  }

  type ContributorTokenAmount {
    status: Int!
    amount: Int!
  }

  type Repo {
    owner: String
    repo_id: String!
    contributor_id: String!
    head: String!
    quorum: String!
  }

  type RepoContributor {
      contributor_id: String!
      contributor: Boolean!
      votePower: Int!
  }

  type ContributorVoteData {
    voted: Boolean!
    side: String!
    votePower: Int!
    createdAt: String!
    contributor_id: String!
  }

  type VoteTotals {
    totalVotes: Int!
    totalYesVotes: Int!
    totalNoVotes: Int!
    votesToQuorum: Int!
    votesToMerge: Int!
    votesToClose: Int!
    totalVotePercent: Float!
    yesPercent: Float!
    noPercent: Float!
    quorum: Float!
  }

  type VoteData {
    contributor: ContributorVoteData!
    voteTotals: VoteTotals!
    votes: [Vote]!
  }

  type GetVotes {
    status: Int!
    repo_id: String!
    title: String!
    head: String!
    remoteURL: String!
    baseBranch: String!
    forkBranch: String!
    childDefaultHash: String!
    defaultHash: String!
    mergeable: Boolean!
    state: String!
    voteData: VoteData!
  }

  type RepoData {
    status: Int!  
    repo_id: String!
    owner: String!
    contributor_id: String!
    head: String!
    quorum: Float!
    contributor: RepoContributor!
    pullRequests: [GetVotes]! 

  type TransferReceipt {
    status: Int!
    repo: String!
    to: String!
    from: String!
    amount: Int!
    createdAt: String!
    network: String!
    id: String!

  }

  type Query {
    createRepo(owner: String, repo: String, defaultHash: String, contributor_id: String, side: String): String,
    getRepo(repo: String): Repo,
    createPullRequest(owner: String, repo: String, defaultHash: String, childDefaultHash: String, head: String, branchDefaultHash: String, remoteURL: String, baseBranch: String, fork_branch: String, title: String): String,
    createLinkedPullRequest(owner: String, repo: String, parentDefaultHash: String, defaultHash: String, childDefaultHash: String, head: String, branchDefaultHash: String, remoteURL: String, baseBranch: String, fork_branch: String, title: String): String,
    updatePullRequest(repo: String, defaultHash: String, childDefaultHash: String): String,
    getRepoStatus(repo_id: String): RepoStatus,
    getRepoData(repo_id: String, contributor_id: String): RepoData,
    getAuthorizedContributor(contributor_id: String, repo_id: String): Boolean,
    getContributorTokenAmount(owner: String, repo: String, defaultHash: String, contributor_id: String, side: String): ContributorTokenAmount,
    transferTokens(owner: String, repo: String, from: String, to: String, amount: Int): TransferReceipt,
    setVote(owner: String, repo: String, defaultHash: String, childDefaultHash: String, mergeable: Boolean, contributor_id: String, side: String): String,
    getPullRequest(owner: String, repo: String, defaultHash: String, contributor_id: String, side: String): PullRequest,
    getMostRecentLinkedPullRequest(owner: String, repo: String, defaultHash: String, contributor_id: String, side: String): PullRequest,
    setQuorum(repo: String, contributor_id: String, quorum: String): String,
    getQuorum(repo: String): String,
    getPRvoteTotals(owner: String, repo: String, defaultHash: String, contributor_id: String, side: String): String,
    getPRvoteYesTotals(owner: String, repo: String, defaultHash: String, contributor_id: String, side: String): String,
    getPRvoteNoTotals(owner: String, repo: String, defaultHash: String, contributor_id: String, side: String): String,
    getVotes(repo: String, defaultHash: String, contributor_id: String): GetVotes,
  }
`);

var root = {
  createRepo: async (args) => {
    return await createRepo(
      args.owner,
      args.repo,
      args.defaultHash,
      args.contributor_id,
      args.side
    );
  },
  getRepo: async (args) => {
    return await getRepo(args.repo);
  },
  createPullRequest: async (args) => {
    return await createPullRequest(
      args.owner,
      args.repo,
      args.defaultHash,
      args.childDefaultHash,
      args.head,
      args.branchDefaultHash,
      args.remoteURL,
      args.baseBranch,
      args.fork_branch,
      args.title
    );
  },
  createLinkedPullRequest: async (args) => {
    return await createLinkedPullRequest(
      args.owner,
      args.repo,
      args.parentDefaultHash,
      args.defaultHash,
      args.childDefaultHash,
      args.head,
      args.branchDefaultHash,
      args.remoteURL,
      args.baseBranch,
      args.fork_branch,
      args.title
    );
  },
  updatePullRequest: async (args) => {
    return await updatePullRequest(
      args.repo,
      args.defaultHash,
      args.childDefaultHash
    );
  },
  getRepoStatus: async (args) => {
    const res = await getRepoStatus(args.repo_id);
    if (res === true) {
      return { status: 200, exists: true };
    } else if (res === false) {
      return { status: 200, exists: false };
    } else if (res === 404) {
      return { status: 404, exists: false };
    } else {
      return { status: 500, exists: false };
    }
  },
  getAuthorizedContributor: async (args) => {
    return await getAuthorizedContributor(args.contributor_id, args.repo_id);
  },
  getContributorTokenAmount: async (args) => {
    return await getContributorTokenAmount(
      args.owner,
      args.repo,
      args.defaultHash,
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
  setVote: async (args) => {
    // Ensure token.status returns a 200
    // and token.amount > 0.
    // May want to incorporate all the into getAuthorizedContributor.
    // Probably not best to check in lib/setVote.js
    // for module encapsulation.
    return await setVote(
      args.owner,
      args.repo,
      args.defaultHash,
      args.childDefaultHash,
      args.mergeable,
      args.contributor_id,
      args.side
    );
  },
  getPullRequest: async (args) => {
    return await getPullRequest(
      args.owner,
      args.repo,
      args.defaultHash,
      args.contributor_id,
      args.side
    );
  },
  getMostRecentLinkedPullRequest: async (args) => {
    return await getMostRecentLinkedPullRequest(
      args.owner,
      args.repo,
      args.defaultHash,
      args.contributor_id,
      args.side
    );
  },
  setQuorum: async (args) => {
    return await setQuorum(args.repo, args.contributor_id, args.quorum);
  },
  getQuorum: async (args) => {
    return await getQuorum(args.repo);
  },
  getPRvoteTotals: async (args) => {
    return getPRvoteTotals(
      args.owner,
      args.repo,
      args.defaultHash,
      args.contributor_id,
      args.side
    );
  },
  getPRvoteYesTotals: async (args) => {
    return getPRvoteYesTotals(
      args.owner,
      args.repo,
      args.defaultHash,
      args.contributor_id,
      args.side
    );
  },
  getPRvoteNoTotals: async (args) => {
    return getPRvoteNoTotals(
      args.owner,
      args.repo,
      args.defaultHash,
      args.contributor_id,
      args.side
    );
  },
  getRepoData: async (args) => {
    return await getRepoData(args.repo_id, args.contributor_id);
  },
  getVotes: async (args) => {
    const res = await getVotes(
      args.repo,
      args.defaultHash,
      args.contributor_id
    );
    return res
  },
};

const port = 4002;

const app = express();

app.listen(port, "0.0.0.0");
console.log(`Running an Express-GraphQL server on port ${port}`);

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
