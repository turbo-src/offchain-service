const superagent = require("superagent");
require("dotenv").config();

const port =
  process.env.NODE_ENV === "fly"
    ? "https://private-store.fly.dev"
    : "http://localhost:4002";

var root = {
  postCreateRepo: async (owner, repo, pr_id, contributor_id, side) => {
    const res = await superagent
      .post(`${port}/graphql`)
      .send({
        query: `{ createRepo(owner: "${owner}", repo: "${repo}", pr_id: "${pr_id}", contributor_id: "${contributor_id}", side: "${side}") }`,
      })
      .set("accept", "json");

    const json = JSON.parse(res.text);
    return json.data.createRepo;
  },
  postCreatePullRequest: async (
    /*owner:*/ owner,
    /*repo:*/ repo,
    /*fork_branch:*/ fork_branch,
    /*pr_id:*/ pr_id,
    /*title:*/ title
  ) => {
    const res = await superagent
      .post(`${port}/graphql`)
      .send({
        query: `{ createPullRequest(owner: "${owner}", repo: "${repo}", fork_branch: "${fork_branch}", pr_id: "${pr_id}", title: "${title}") }`,
      })
      .set("accept", "json");

    const json = JSON.parse(res.text);
    return json.data.createPullRequest;
  },
  getRepoStatus: async (repo_id) => {
    const res = await superagent
      .post(`${port}/graphql`)
      .send({
        query: `{ getRepoStatus(repo_id: "${repo_id}" ) { status, exists } }`,
      })
      .set("accept", "json");
    //.end((err, res) => {
    // Calling the end function will send the request
    //});
    const json = JSON.parse(res.text);
    return json.data.getRepoStatus;
  },
  postGetAuthorizedContributor: async (contributor_id, repo_id) => {
    const res = await superagent
      .post(`${port}/graphql`)
      .send({
        query: `{ getAuthorizedContributor(contributor_id: "${contributor_id}", repo_id: "${repo_id}") }`,
      })
      .set("accept", "json");
    //.end((err, res) => {
    //});
    const json = JSON.parse(res.text);
    return json.data.getAuthorizedContributor;
  },
  postGetContributorTokenAmount: async (
    owner,
    repo,
    pr_id,
    contributor_id,
    side
  ) => {
    const res = await superagent
      .post(`${port}/graphql`)
      .send({
        query: `{ getContributorTokenAmount(owner: "${owner}", repo: "${repo}", pr_id: "${pr_id}", contributor_id: "${contributor_id}", side: "${side}") { status, amount } }`,
      }) // sends a JSON post body
      .set("accept", "json");
    //.end((err, res) => {
    // Calling the end function will send the request
    //});
    const json = JSON.parse(res.text);
    return json.data.getContributorTokenAmount;
  },
  postTransferTokens: async (owner, repo, from, to, amount) => {
    const res = await superagent
      .post(`${port}/graphql`)
      .send({
        query: `{ transferTokens(owner: "${owner}", repo: "${repo}", from: "${from}", to: "${to}", amount: "${amount}") }`,
      }) // sends a JSON post body
      .set("accept", "json");
    //   .end((err, res) => {
    // Calling the end function will send the request
    //   });
    const json = JSON.parse(res.text);
    return json.data.transferTokens;
  },
  postSetVote: async (owner, repo, pr_id, contributor_id, side) => {
    const res = await superagent
      .post(`${port}/graphql`)
      .send({
        query: `{ setVote(owner: "${owner}", repo: "${repo}", pr_id: "${pr_id}", contributor_id: "${contributor_id}", side: "${side}") }`,
      })
      .set("accept", "json");
    //   .end((err, res) => {
    //      Calling the end function will send the request
    //   });
    const json = JSON.parse(res.text);
    return json.data.setVote;
  },
  postGetPRvoteStatus: async (owner, repo, pr_id, contributor_id, side) => {
    const res = await superagent
      .post(`${port}/graphql`)
      .send({
        query: `{ getPRvoteStatus(owner: "${owner}", repo: "${repo}", pr_id: "${pr_id}", contributor_id: "${contributor_id}", side: "${side}") { status, type } }`,
      })
      .set("accept", "json");
    //.end((err, res) => {
    // Calling the end function will send the request
    //});
    const json = JSON.parse(res.text);
    return json.data.getPRvoteStatus;
  },
  postSetQuorum: async (repo, contributor_id, quorum) => {
    const res = await superagent
      .post(`${port}/graphql`)
      .send({
        query: `{ setQuorum(owner: "${owner}", repo: "${repo}", pr_id: "${pr_id}", contributor_id: "${contributor_id}", side: "${side}", quorum: "${quorum}") }`,
      })
      .set("accept", "json")
      .end((err, res) => {
        // Calling the end function will send the request
      });
    const json = JSON.parse(res.text);
    return json.data.setQuorum;
  },
  postGetQuorum: async (repo) => {
    const res = await superagent
      .post(`${port}/graphql`)
      .send({
        query: `{ getQuorum(repo: "${repo}") }`,
      })
      .set("accept", "json")
      .end((err, res) => {
        // Calling the end function will send the request
      });
    const json = JSON.parse(res.text);
    return json.data.getQuorum;
  },
  postGetPRvoteTotals: async (owner, repo, pr_id, contributor_id, side) => {
    const res = await superagent
      .post(`${port}/graphql`)
      .send({
        query: `{ getPRvoteTotals(owner: "${owner}", repo: "${repo}", pr_id: "${pr_id}", contributor_id: "${contributor_id}", side: "${side}") }`,
      })
      .set("accept", "json");
    //.end((err, res) => {
    // Calling the end function will send the request
    //});
    const json = JSON.parse(res.text);
    return json.data.getVoteTotals;
  },
  postGetPRvoteYesTotals: async (owner, repo, pr_id, contributor_id, side) => {
    const res = await superagent
      .post(`${port}/graphql`)
      .send({
        query: `{ getPRvoteYesTotals(owner: "${owner}", repo: "${repo}", pr_id: "${pr_id}", contributor_id: "${contributor_id}", side: "${side}") }`,
      })
      .set("accept", "json");
    //.end((err, res) => {
    // // Calling the end function will send the request
    //});
    const json = JSON.parse(res.text);
    return json.data.getPRvoteYesTotals;
  },
  postGetPRvoteNoTotals: async (owner, repo, pr_id, contributor_id, side) => {
    const res = await superagent
      .post(`${port}/graphql`)
      .send({
        query: `{ getPRvoteNoTotals(owner: "${owner}", repo: "${repo}", pr_id: "${pr_id}", contributor_id: "${contributor_id}", side: "${side}") }`,
      })
      .set("accept", "json");
    //.end((err, res) => {
    // Calling the end function will send the request
    //});
    const json = JSON.parse(res.text);
    return json.data.getPRvoteNoTotals;
  },
  mostRecentMerge: async (repo) => {
    const res = await superagent
      .post(`${port}/graphql`)
      .send({
        query: `{ mostRecentMerge(repo: "${repo}") }`,
      })
      .set("accept", "json");
    const json = JSON.parse(res.text);
    return json.data.mostRecentMerge;
  },
};

module.exports = root;
