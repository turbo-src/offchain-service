const superagent = require("superagent");
//     getContributorTokenAmount(owner: String, repo: String, pr_id: String, contributor_id: String, side: String): String,
//     getContributorName(owner: String, repo: String, pr_id: String, contributor_id: String): String,
//     getContributorID(owner: String, repo: String, pr_id: String, contributor_name: String): String,
//     getContributorSignature(owner: String, repo: String, pr_id: String, contributor_id: String): String,
//     transferTokens(owner: String, repo: String, from: String, to: String, amount: String): String,
//     setVote(owner: String, repo: String, pr_id: String, contributor_id: String, side: String): String,
//     createPullRequest(owner: String, repo: String, pr_id: String, contributor_id: String, side: String): String,
//     getPRStatus(owner: String, repo: String, pr_id: String, contributor_id: String, side: String): String,
//     getVoteYesTotals(owner: String, repo: String, pr_id: String, contributor_id: String, side: String): String,
//     getVoteNoTotals(owner: String, repo: String, pr_id: String, contributor_id: String, side: String): String,
//     getRepoStatus(repo_id: String): String,
//     getAuthorizedContributor(contributor_id: String, repo_id: String): Boolean,
var root = {
  postCreateUser: async (
    owner,
    repo,
    contributor_id,
    contributor_name,
    contributor_signature
  ) => {
    superagent
      .post("http://localhost:4000/graphql")
      .send({
        query: `{ createUser(owner: "${owner}", repo: "${repo}", contributor_id: "${contributor_id}", contributor_name: "${contributor_name}", contributor_signature: "${contributor_signature}") }`,
      })
      .set("accept", "json")
      .end((err, res) => {
        // Calling the end function will send the request
      });
  },
  postCreateRepo: async (owner, repo, issue_id, contributor_id, side) => {
    superagent
      .post("http://localhost:4000/graphql")
      .send({
        query: `{ createRepo(owner: "${owner}", repo: "${repo}", pr_id: "${issue_id}", contributor_id: "${contributor_id}", side: "${side}") }`,
      })
      .set("accept", "json")
      .end((err, res) => {
        // Calling the end function will send the request
      });
  },
  postCreatePullRequest: async (
    owner,
    repo,
    issue_id,
    contributor_id,
    side,
    vote_status
  ) => {
    superagent
      .post("http://localhost:4000/graphql")
      .send({
        query: `{ createPullRequest(owner: "${owner}", repo: "${repo}", pr_id: "${issue_id}", contributor_id: "${contributor_id}", side: "${side}", vote_status: "${vote_status}") }`,
      })
      .set("accept", "json")
      .end((err, res) => {
        // Calling the end function will send the request
      });
  },
  postGetContributorName: async (owner, repo, issue_id, contributor_id) => {
    const res = await superagent
      .post("http://localhost:4000/graphql")
      .send({
        query: `{ getContributorName(owner: "${owner}", repo: "${repo}", pr_id: "${issue_id}", contributor_id: "${contributor_id}") }`,
      }) // sends a JSON post body
      .set("accept", "json");
    //.end((err, res) => {
    // Calling the end function will send the request
    //});
    return res;
  },
  postGetContributorID: async (owner, repo, issue_id, contributor_name) => {
    const res = await superagent
      .post("http://localhost:4000/graphql")
      .send({
        query: `{ getContributorID(owner: "${owner}", repo: "${repo}", pr_id: "${issue_id}", contributor_name: "${contributor_name}") }`,
      }) // sends a JSON post body
      .set("accept", "json");
    //.end((err, res) => {
    // Calling the end function will send the request
    //});
    return res;
  },
  postGetContributorSignature: async (
    owner,
    repo,
    issue_id,
    contributor_id
  ) => {
    const res = await superagent
      .post("http://localhost:4000/graphql")
      .send({
        query: `{ getContributorSignature(owner: "${owner}", repo: "${repo}", pr_id: "${issue_id}", contributor_id: "${contributor_id}") }`,
      })
      .set("accept", "json");
    //.end((err, res) => {
    // Calling the end function will send the request
    //});
    return res;
  },
  getRepoStatus: async (repo_id) => {
    return await superagent
      .post("http://localhost:4000/graphql")
      .send({ query: `{ getRepoStatus(repo_id: "${repo_id}") }` })
      .set("accept", "json");
  },
  getAuthorizedContributor: async (contributor_id, repo_id) => {
    return await superagent
      .post("http://localhost:4000/graphql")
      .send({
        query: `{ getAuthorizedContributor(contributor_id: "${contributor_id}", repo_id: "${repo_id}") }`,
      })
      .set("accept", "json");
  },
  postGetContributorTokenAmount: async (
    owner,
    repo,
    issue_id,
    contributor_id,
    side
  ) => {
    const res = await superagent
      .post("http://localhost:4000/graphql")
      .send(
        {
          query: `{ getContributorTokenAmount(owner: "${owner}", repo: "${repo}", pr_id: "${issue_id}", contributor_id: "${contributor_id}", side: "${side}") }`,
        }
        //{ query: '{ setVote(pr_id: "default" contributorId: "2", side: 1 ) { vote_code }' }
      ) // sends a JSON post body
      .set("accept", "json");
    //.end((err, res) => {
    // Calling the end function will send the request
    //});
    const json = JSON.parse(res.text);

    return json.data;
  },
  postTransferTokens: async (owner, repo, from, to, amount) => {
    superagent
      .post("http://localhost:4000/graphql")
      .send({
        query: `{ transferTokens(owner: "${owner}", repo: "${repo}", from: "${from}", to: "${to}", amount: "${amount}") }`,
      }) // sends a JSON post body
      .set("accept", "json")
      .end((err, res) => {
        // Calling the end function will send the request
      });
  },
  postSetVote: async (owner, repo, issue_id, contributor_id, side) => {
    superagent
      .post("http://localhost:4000/graphql")
      .send({
        query: `{ setVote(owner: "${owner}", repo: "${repo}", pr_id: "${issue_id}", contributor_id: "${contributor_id}", side: "${side}") }`,
      }) // sends a JSON post body
      .set("accept", "json")
      .end((err, res) => {
        // Calling the end function will send the request
      });
  },
  postGetPRStatus: async (owner, repo, issue_id, contributor_id, side) => {
    const res = await superagent
      .post("http://localhost:4000/graphql")
      .send({
        query: `{ getPRStatus(owner: "${owner}", repo: "${repo}", pr_id: "${issue_id}", contributor_id: "${contributor_id}", side: "${side}") }`,
      }) // sends a JSON post body
      .set("accept", "json");
    //.end((err, res) => {
    // Calling the end function will send the request
    //});
    const json = JSON.parse(res.text);
    return json.data.getPRvoteStatus;
  },
  postGetVoteTotals: async (owner, repo, issue_id, contributor_id, side) => {
    const res = await superagent
      .post("http://localhost:4000/graphql")
      .send({
        query: `{ getPRvoteTotals(owner: "${owner}", repo: "${repo}", pr_id: "${issue_id}", contributor_id: "${contributor_id}", side: "${side}") }`,
      })
      .set("accept", "json");
    //.end((err, res) => {
    // Calling the end function will send the request
    //});
    const json = JSON.parse(res.text);
    return json.data.totalVotedTokens;
  },
  postSetQuorum: async (
    owner,
    repo,
    issue_id,
    contributor_id,
    side,
    quorum
  ) => {
    superagent
      .post("http://localhost:4000/graphql")
      .send({
        query: `{ setQuorum(owner: "${owner}", repo: "${repo}", pr_id: "${issue_id}", contributor_id: "${contributor_id}", side: "${side}", quorum: "${quorum}") }`,
      }) // sends a JSON post body
      .set("accept", "json")
      .end((err, res) => {
        // Calling the end function will send the request
      });
  },
  postGetQuorum: async (repo_id) => {
    superagent
      .post("http://localhost:4000/graphql")
      .send({
        query: `{ getQuorum(repo_id: "${repo_id}") }`,
      }) // sends a JSON post body
      .set("accept", "json")
      .end((err, res) => {
        // Calling the end function will send the request
      });
  },
  postGetVoteYesTotals: async (owner, repo, issue_id, contributor_id, side) => {
    const res = await superagent
      .post("http://localhost:4000/graphql")
      .send({
        query: `{ getVoteYesTotals(owner: "${owner}", repo: "${repo}", pr_id: "${issue_id}", contributor_id: "${contributor_id}", side: "${side}") }`,
      })
      .set("accept", "json");
    //.end((err, res) => {
    // Calling the end function will send the request
    //});
    const json = JSON.parse(res.text);
    return json.data.getVoteYesTotals;
  },
  postGetVoteNoTotals: async (owner, repo, issue_id, contributor_id, side) => {
    const res = await superagent
      .post("http://localhost:4000/graphql")
      .send({
        query: `{ getVoteNoTotals(owner: "${owner}", repo: "${repo}", pr_id: "${issue_id}", contributor_id: "${contributor_id}", side: "${side}") }`,
      })
      .set("accept", "json");
    //.end((err, res) => {
    // Calling the end function will send the request
    //});
    const json = JSON.parse(res.text);
    return json.data.getVoteNoTotals;
  },
};

module.exports = root;
