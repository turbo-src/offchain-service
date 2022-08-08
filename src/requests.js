const superagent = require("superagent");

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
        //Calling the end function will send the request
        const json = JSON.parse(res.text);
        return json.data.createUser;
      });
  },
  postCreateRepo: async (owner, repo, pr_id, contributor_id, side) => {
    const res = await superagent
      .post("http://localhost:4000/graphql")
      .send({
        query: `{ createRepo(owner: "${owner}", repo: "${repo}", pr_id: "${pr_id}", contributor_id: "${contributor_id}", side: "${side}") }`,
      })
      .set("accept", "json");

    const json = JSON.parse(res.text);
    return json.data.createRepo;
  },
  postCreatePullRequest: async (
    /*owner:*/ owner,
    /*repo_id:*/ repo_id,
    /*fork_branch:*/ fork_branch,
    /*pr_id:*/ pr_id,
    /*title:*/ title
  ) => {
    const res = await superagent
      .post("http://localhost:4000/graphql")
      .send({
        query: `{ createPullRequest(owner: "${owner}", repo_id: "${repo_id}", fork_branch: "${fork_branch}", pr_id: "${pr_id}", title: "${title}") }`,
      })
      .set("accept", "json");

    const json = JSON.parse(res.text);
    return json.data.createPullRequest;
  },
  postGetContributorName: async (owner, repo, pr_id, contributor_id) => {
    const res = await superagent
      .post("http://localhost:4000/graphql")
      .send({
        query: `{ getContributorName(owner: "${owner}", repo: "${repo}", pr_id: "${pr_id}", contributor_id: "${contributor_id}") }`,
      })
      .set("accept", "json");
    // .end((err, res) => {
    //   const json = JSON.parse(res.text);
    //   return json.data.getContributorName;
    // });
    const json = JSON.parse(res.text);
    return json.data.getContributorName;
  },
  postGetContributorID: async (owner, repo, pr_id, contributor_name) => {
    const res = await superagent
      .post("http://localhost:4000/graphql")
      .send({
        query: `{ getContributorID(owner: "${owner}", repo: "${repo}", pr_id: "${pr_id}", contributor_name: "${contributor_name}") }`,
      })
      .set("accept", "json");
    //.end((err, res) => {
    // Calling the end function will send the request
    //});
    const json = JSON.parse(res.text);
    return json.data.getContributorID;
  },
  postGetContributorSignature: async (owner, repo, pr_id, contributor_id) => {
    const res = await superagent
      .post("http://localhost:4000/graphql")
      .send({
        query: `{ getContributorSignature(owner: "${owner}", repo: "${repo}", pr_id: "${pr_id}", contributor_name: "${contributor_name}") }`,
      })
      .set("accept", "json");
    //.end((err, res) => {
    // Calling the end function will send the request
    //});
    const json = JSON.parse(res.text);
    return json.data.getContributorSignature;
  },
  // getRepoStatus: async (repo_id) => {
  //   const res = await superagent
  //     .post("http://localhost:4000/graphql")
  //     .send({ query: `{ getRepoStatus(repo_id: "${repo_id}") }` })
  //     .set("accept", "json");
  //   const json = JSON.parse(res);
  //   return json.data;
  // },
  // getAuthorizedContributor: async (contributor_id, repo_id) => {
  //   return await superagent
  //     .post("http://localhost:4000/graphql")
  //     .send({
  //       query: `{ getAuthorizedContributor(contributor_id: "${contributor_id}", repo_id: "${repo_id}") }`,
  //     })
  //     .set("accept", "json");
  // },
  // postGetContributorTokenAmount: async (
  //   owner,
  //   repo,
  //   pr_id,
  //   contributor_id,
  //   side
  // ) => {
  //   const res = await superagent
  //     .post("http://localhost:4000/graphql")
  //     .send({
  //       query: `{ getContributorTokenAmount(owner: "${owner}", repo: "${repo}", pr_id: "${pr_id}", contributor_id: "${contributor_id}", side: "${side}") }`,
  //     }) // sends a JSON post body
  //     .set("accept", "json");
  //   //.end((err, res) => {
  //   // Calling the end function will send the request
  //   //});
  //   const json = JSON.parse(res);
  //   return json.data;
  // },
  // postTransferTokens: async (owner, repo, from, to, amount) => {
  //   const res = superagent
  //     .post("http://localhost:4000/graphql")
  //     .send({
  //       query: `{ transferTokens(owner: "${owner}", repo: "${repo}", from: "${from}", to: "${to}", amount: "${amount}") }`,
  //     }) // sends a JSON post body
  //     .set("accept", "json");
  //   //   .end((err, res) => {
  //   // Calling the end function will send the request
  //   //   });
  //   const json = JSON.parse(res);
  //   return json.data;
  // },
  // postSetVote: async (owner, repo, pr_id, contributor_id, side) => {
  //   const res = superagent
  //     .post("http://localhost:4000/graphql")
  //     .send({
  //       query: `{ setVote(owner: "${owner}", repo: "${repo}", pr_id: "${pr_id}", contributor_id: "${contributor_id}", side: "${side}") }`,
  //     })
  //     .set("accept", "json");
  //   //   .end((err, res) => {
  //   //      Calling the end function will send the request
  //   //   });
  //   const json = JSON.parse(res);
  //   return json.data;
  // },
  // postGetPRStatus: async (owner, repo, pr_id, contributor_id, side) => {
  //   const res = await superagent
  //     .post("http://localhost:4000/graphql")
  //     .send({
  //       query: `{ getPRStatus(owner: "${owner}", repo: "${repo}", pr_id: "${pr_id}", contributor_id: "${contributor_id}", side: "${side}") }`,
  //     })
  //     .set("accept", "json");
  //   //.end((err, res) => {
  //   // Calling the end function will send the request
  //   //});
  //   const json = JSON.parse(res);
  //   return json.data;
  // },
  // postSetQuorum: async (repo_id, contributor_id, quorum) => {
  //   const res = superagent
  //     .post("http://localhost:4000/graphql")
  //     .send({
  //       query: `{ setQuorum(owner: "${owner}", repo_id: "${repo_id}", pr_id: "${pr_id}", contributor_id: "${contributor_id}", side: "${side}", quorum: "${quorum}") }`,
  //     })
  //     .set("accept", "json")
  //     .end((err, res) => {
  //       // Calling the end function will send the request
  //     });
  //   const json = JSON.parse(res);
  //   return json.data;
  // },
  // postGetQuorum: async (repo_id) => {
  //   const res = superagent
  //     .post("http://localhost:4000/graphql")
  //     .send({
  //       query: `{ getQuorum(repo_id: "${repo_id}") }`,
  //     })
  //     .set("accept", "json")
  //     .end((err, res) => {
  //       // Calling the end function will send the request
  //     });
  //   const json = JSON.parse(res);
  //   return json.data;
  // },
  // postGetVoteTotals: async (owner, repo, pr_id, contributor_id, side) => {
  //   const res = await superagent
  //     .post("http://localhost:4000/graphql")
  //     .send({
  //       query: `{ getVoteTotals(owner: "${owner}", repo: "${repo}", pr_id: "${pr_id}", contributor_id: "${contributor_id}", side: "${side}") }`,
  //     })
  //     .set("accept", "json");
  //   //.end((err, res) => {
  //   // Calling the end function will send the request
  //   //});
  //   const json = JSON.parse(res);
  //   return json.data.totalVotedTokens;
  // },
  // postGetVoteYesTotals: async (owner, repo, pr_id, contributor_id, side) => {
  //   const res = await superagent
  //     .post("http://localhost:4000/graphql")
  //     .send({
  //       query: `{ getVoteYesTotals(owner: "${owner}", repo: "${repo}", pr_id: "${pr_id}", contributor_id: "${contributor_id}", side: "${side}") }`,
  //     })
  //     .set("accept", "json");
  //   //.end((err, res) => {
  //   // Calling the end function will send the request
  //   //});
  //   const json = JSON.parse(res);
  //   return json.data.getVoteYesTotals;
  // },
  // postGetVoteNoTotals: async (owner, repo, pr_id, contributor_id, side) => {
  //   const res = await superagent
  //     .post("http://localhost:4000/graphql")
  //     .send({
  //       query: `{ getVoteNoTotals(owner: "${owner}", repo: "${repo}", pr_id: "${pr_id}", contributor_id: "${contributor_id}", side: "${side}") }`,
  //     })
  //     .set("accept", "json");
  //   //.end((err, res) => {
  //   // Calling the end function will send the request
  //   //});
  //   const json = JSON.parse(res);
  //   return json.data.getVoteNoTotals;
  // },
};

module.exports = root;
