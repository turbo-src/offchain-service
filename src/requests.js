const superagent = require("superagent");
require("dotenv").config();

const port =
  process.env.NODE_ENV === "fly"
    ? "https://private-store.fly.dev"
    : "http://localhost:4002";

var root = {
  postCreateRepo: async (owner, repo, defaultHash, contributor_id, side) => {
    const res = await superagent
      .post(`${port}/graphql`)
      .send({
        query: `{ createRepo(owner: "${owner}", repo: "${repo}", defaultHash: "${defaultHash}", contributor_id: "${contributor_id}", side: "${side}") }`,
      })
      .set("accept", "json");

    const json = JSON.parse(res.text);
    return json.data.createRepo;
  },
  getRepo: async (repo) => {
    const res = await superagent
      .post(`${port}/graphql`)
      .send({
        query: `{ getRepo(repo: "${repo}") }`,
      })
      .set("accept", "json");

    const json = JSON.parse(res.text);
    return json.data.getRepo;
  },
  postCreatePullRequest: async (
    owner,
    repo,
    defaultHash,
    childDefaultHash,
    head,
    branchDefaultHash,
    remoteURL,
    baseBranch,
    fork_branch,
    title,
    issue_id,
    state
  ) => {
    const res = await superagent
      .post(`${port}/graphql`)
      .send({
        query: `{ createPullRequest(owner: "${owner}", repo: "${repo}", defaultHash: "${defaultHash}", childDefaultHash: "${childDefaultHash}", head: "${head}", branchDefaultHash: "${branchDefaultHash}", remoteURL: "${remoteURL}", baseBranch: "${baseBranch}"fork_branch: "${fork_branch}", title: "${title}",  issue_id: "${issue_id}", state: "${state}") }`,
      })
      .set("accept", "json");

    const json = JSON.parse(res.text);
    return json.data.createPullRequest;
  },
  createLinkedPullRequest: async (
    owner,
    repo,
    parentDefaultHash,
    defaultHash,
    childDefaultHash,
    head,
    branchDefaultHash,
    remoteURL,
    baseBranch,
    fork_branch,
    title
  ) => {
    const res = await superagent
      .post(`${port}/graphql`)
      .send({
        query: `{ createLinkedPullRequest(owner: "${owner}", repo: "${repo}", parentDefaultHash: "${parentDefaultHash}", defaultHash: "${defaultHash}", childDefaultHash: "${childDefaultHash}", head: "${head}", branchDefaultHash: "${branchDefaultHash}", remoteURL: "${remoteURL}", baseBranch: "${baseBranch}"fork_branch: "${fork_branch}", title: "${title}") }`,
      })
      .set("accept", "json");

    const json = JSON.parse(res.text);
    return json.data.createLinkedPullRequest;
  },
  updatePullRequest: async (
    repo,
    defaultHash,
    childDefaultHash
  ) => {
    const res = await superagent
      .post(`${port}/graphql`)
      .send({
        query: `{ updatePullRequest(repo: "${repo}", defaultHash: "${defaultHash}", childDefaultHash: "${childDefaultHash}") }`,
      })
      .set("accept", "json");

    const json = JSON.parse(res.text);
    return json.data.updatePullRequest;
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
  postGetVotePowerAmount: async (
    owner,
    repo,
    defaultHash,
    contributor_id,
    side
  ) => {
    const res = await superagent
      .post(`${port}/graphql`)
      .send({
        query: `{ getVotePowerAmount(owner: "${owner}", repo: "${repo}", defaultHash: "${defaultHash}", contributor_id: "${contributor_id}", side: "${side}") { status, amount } }`,
      }) // sends a JSON post body
      .set("accept", "json");
    //.end((err, res) => {
    // Calling the end function will send the request
    //});
    const json = JSON.parse(res.text);
    return json.data.getVotePowerAmount;
  },
  postTransferTokens: async (owner, repo, from, to, amount) => {
    const res = await superagent
      .post(`${port}/graphql`)
      .send({
        query: `{ transferTokens(owner: "${owner}", repo: "${repo}", from: "${from}", to: "${to}", amount: ${amount} ) { status, repo, from, to, amount, createdAt, network, id } }`,
      }) // sends a JSON post body
      .set("accept", "json");
    //   .end((err, res) => {
    // Calling the end function will send the request
    //   });
    const json = JSON.parse(res.text);
    return json.data.transferTokens;
  },
  postSetVote: async (owner, repo, defaultHash, childDefaultHash, mergeable, contributor_id, side) => {
    const res = await superagent
      .post(`${port}/graphql`)
      .send({
	      query: `{ setVote(owner: "${owner}", repo: "${repo}", defaultHash: "${defaultHash}", childDefaultHash: "${childDefaultHash}", mergeable: ${mergeable}, contributor_id: "${contributor_id}", side: "${side}") }`,
      })
      .set("accept", "json");
    //   .end((err, res) => {
    //      Calling the end function will send the request
    //   });
    const json = JSON.parse(res.text);
    return json.data.setVote;
  },
  postGetPullRequest: async (owner, repo, defaultHash, contributor_id, side) => {
    const res = await superagent
      .post(`${port}/graphql`)
      .send({
        query: `{ getPullRequest(owner: "${owner}", repo: "${repo}", defaultHash: "${defaultHash}", contributor_id: "${contributor_id}", side: "${side}") { status, state, repo_id, fork_branch, defaultHash, childDefaultHash, head, branchDefaultHash, remoteURL, baseBranch } }`,
      })
      .set("accept", "json");
    //.end((err, res) => {
    // Calling the end function will send the request
    //});
    const json = JSON.parse(res.text);
    return json.data.getPullRequest;
  },
  postGetMostRecentLinkedPullRequest: async (owner, repo, defaultHash, contributor_id, side) => {
    const res = await superagent
      .post(`${port}/graphql`)
      .send({
        query: `{ getMostRecentLinkedPullRequest(owner: "${owner}", repo: "${repo}", defaultHash: "${defaultHash}", contributor_id: "${contributor_id}", side: "${side}") { status, state, repo_id, fork_branch, defaultHash, childDefaultHash, head, branchDefaultHash, remoteURL, baseBranch } }`,
      })
      .set("accept", "json");
    //.end((err, res) => {
    // Calling the end function will send the request
    //});
    const json = JSON.parse(res.text);
    return json.data.getMostRecentLinkedPullRequest;
  },
  postSetQuorum: async (repo, contributor_id, quorum) => {
    const res = await superagent
      .post(`${port}/graphql`)
      .send({
        query: `{ setQuorum(owner: "${owner}", repo: "${repo}", defaultHash: "${defaultHash}", contributor_id: "${contributor_id}", side: "${side}", quorum: "${quorum}") }`,
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
  postGetPRvoteTotals: async (owner, repo, defaultHash, contributor_id, side) => {
    const res = await superagent
      .post(`${port}/graphql`)
      .send({
        query: `{ getPRvoteTotals(owner: "${owner}", repo: "${repo}", defaultHash: "${defaultHash}", contributor_id: "${contributor_id}", side: "${side}") }`,
      })
      .set("accept", "json");
    //.end((err, res) => {
    // Calling the end function will send the request
    //});
    const json = JSON.parse(res.text);
    return json.data.getVoteTotals;
  },
  postGetPRvoteYesTotals: async (owner, repo, defaultHash, contributor_id, side) => {
    const res = await superagent
      .post(`${port}/graphql`)
      .send({
        query: `{ getPRvoteYesTotals(owner: "${owner}", repo: "${repo}", defaultHash: "${defaultHash}", contributor_id: "${contributor_id}", side: "${side}") }`,
      })
      .set("accept", "json");
    //.end((err, res) => {
    // // Calling the end function will send the request
    //});
    const json = JSON.parse(res.text);
    return json.data.getPRvoteYesTotals;
  },
  postGetPRvoteNoTotals: async (owner, repo, defaultHash, contributor_id, side) => {
    const res = await superagent
      .post(`${port}/graphql`)
      .send({
        query: `{ getPRvoteNoTotals(owner: "${owner}", repo: "${repo}", defaultHash: "${defaultHash}", contributor_id: "${contributor_id}", side: "${side}") }`,
      })
      .set("accept", "json");
    //.end((err, res) => {
    // Calling the end function will send the request
    //});
    const json = JSON.parse(res.text);
    return json.data.getPRvoteNoTotals;
  },
  getRepoData: async (repo_id, contributor_id) => {
    const res = await superagent
      .post(`${port}/graphql`)
      .send({
        query: `{ getRepoData(repo_id: "${repo_id}", contributor_id: "${contributor_id}")
        {   
          status, 
          repo_id,
          owner,
          contributor_id,
          head,
          inSession,
          quorum,
          contributor { 
            contributor_id,
            contributor,
            votePower,
          }, 
        pullRequests { 
          state,
          repo_id,
          issue_id,
          title,
          forkBranch,
          baseBranch,
          defaultHash,
          childDefaultHash,
          head,
          defaultHash,
          remoteURL
        voteData {
          contributor {
          contributor_id,
          voted,
          votePower,
          createdAt,
          },
        voteTotals {
          yesPercent,
          noPercent,
          totalVotes,
          totalYesVotes,
          totalNoVotes,
        },
        votes {
      		contributor_id,
          side,
          votePower,
          createdAt
        }
      }
    } 
  } 
}`,
      })
      .set("accept", "json");
    const json = JSON.parse(res.text);
    return json.data.getRepoData;
  },
    getVotes: async (repo, defaultHash, contributor_id) => {
    const res = await superagent
      .post(`${port}/graphql`)
      .send({
        query: `
        { getVotes(repo: "${repo}", defaultHash: "${defaultHash}", contributor_id:"${contributor_id}") 
{ status, repo_id, title, head, remoteURL, baseBranch, forkBranch, childDefaultHash, defaultHash, mergeable, state
            voteData {
              contributor {
                voted, side, votePower, createdAt, contributor_id
              },
              voteTotals {
                totalVotes, totalYesVotes, totalNoVotes, votesToQuorum, votesToMerge, votesToClose, totalVotePercent, yesPercent, noPercent, quorum
              },
              votes { contributor_id, side, votePower, createdAt }
              },
            }
}
      `,
      })
      .set("accept", "json");
    const json = JSON.parse(res.text);
    return json.data.getVotes;
  },
};

module.exports = root;
