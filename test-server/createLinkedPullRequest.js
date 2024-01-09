const assert = require("assert");
const {
  postSetVote,
  postGetMostRecentLinkedPullRequest,
  postGetPRvoteYesTotals,
  postGetPRvoteNoTotals,
  createLinkedPullRequest,
  postGetPullRequest
} = require("../src/requests");

describe("createLinkedPullRequest", function () {
  it("create a pull request associated with the repo_id supplied", async function () {
    this.timeout(4000);

    console.log('pull request', await postGetPullRequest("joseph", "joseph/demo", "defaultHash10", "", "yes"))
    console.log(
      'most recent pull request',
      await postGetMostRecentLinkedPullRequest(
          /*owner:*/ "joseph",
          /*repo:*/ "joseph/demo",
          /*defaultHash:*/ "defaultHash10",
          /*contributor:*/ "",
          /*side:*/ ""
      )
    );

    console.log('michael vote\n')

    // Vote on original
    let michaelVote = await postSetVote(
      /*owner:*/ "joseph",
      /*repo:*/ "joseph/demo",
      /*defaultHash:*/ "defaultHash10",
      /*childDefaultHash:*/ "defaultHash10",
      /*mergeable:*/ true,
      /*contributor_id:*/ "0x0c55D3B26A1229B9D707a4272F55E66103301858",
      /*side:*/ "yes"
    );

    console.log('pull request', await postGetPullRequest("joseph", "joseph/demo", "defaultHash10", "", "yes"))
    console.log(
      'most recent pull request',
      await postGetMostRecentLinkedPullRequest(
          /*owner:*/ "joseph",
          /*repo:*/ "joseph/demo",
          /*defaultHash:*/ "defaultHash10",
          /*contributor:*/ "",
          /*side:*/ ""
      )
    );

    console.log('create linked b\n')
    const issue_10b = await createLinkedPullRequest(
      /*owner:*/ "joseph",
      /*repo_id:*/ "joseph/demo",
      /*parentDefaultHash:*/ "defaultHash10",
      /*defaultHash:*/ "defaultHash10b",
      /*childDefaultHash:*/ "defaultHash10b",
      /*head:*/ "defaultHash10b",
      /*branchDefaultHash*/ "branchDefaultHash",
      /*remoteURL*/ "remoteURL",
      /*baseBranch:*/ "master",
      /*fork_branch:*/ "pullRequest10",
      /*title:*/ "feat: create linked pull request."
    );


    console.log('pull request', await postGetPullRequest("joseph", "joseph/demo", "defaultHash10", "", "yes"))
    console.log('pull request', await postGetPullRequest("joseph", "joseph/demo", "defaultHash10b", "", "yes"))
    console.log(
      'most recent pull request',
      await postGetMostRecentLinkedPullRequest(
          /*owner:*/ "joseph",
          /*repo:*/ "joseph/demo",
          /*defaultHash:*/ "defaultHash10",
          /*contributor:*/ "",
          /*side:*/ ""
      )
    );

    console.log('grabriel vote - a b\n')
    let gabrielVote = await postSetVote(
      /*owner:*/ "joseph",
      /*repo:*/ "joseph/demo",
      /*defaultHash:*/ "defaultHash10",
      /*childDefaultHash:*/ "defaultHash10b",
      /*mergeable:*/ true,
      /*contributor_id:*/ "0x0cf39Fb66C908A8aAb733F52BaDbf1ED58036983",
      /*side*/ "yes"
    );

    console.log('pull request', await postGetPullRequest("joseph", "joseph/demo", "defaultHash10", "", "yes"))
    console.log('pull request', await postGetPullRequest("joseph", "joseph/demo", "defaultHash10b", "", "yes"))
    console.log(
      'most recent pull request',
      await postGetMostRecentLinkedPullRequest(
          /*owner:*/ "joseph",
          /*repo:*/ "joseph/demo",
          /*defaultHash:*/ "defaultHash10",
          /*contributor:*/ "",
          /*side:*/ ""
      )
    );

    console.log('magda vote - b b\n')
    let magdaVote = await postSetVote(
      /*owner:*/ "joseph",
      /*repo:*/ "joseph/demo",
      /*defaultHash:*/ "defaultHash10b",
      /*childDefaultHash:*/ "defaultHash10b",
      /*mergeable:*/ true,
      /*contributor_id:*/ "0x0cBA86ac2Cd45DfA9bA798e86b24dCb074E92925",
      /*side*/ "yes"
    );

    console.log('pull request', await postGetPullRequest("joseph", "joseph/demo", "defaultHash10", "", "yes"))
    console.log('pull request', await postGetPullRequest("joseph", "joseph/demo", "defaultHash10b", "", "yes"))
    console.log(
      'most recent pull request',
      await postGetMostRecentLinkedPullRequest(
          /*owner:*/ "joseph",
          /*repo:*/ "joseph/demo",
          /*defaultHash:*/ "defaultHash10",
          /*contributor:*/ "",
          /*side:*/ ""
      )
    );

    const issue_10c = await createLinkedPullRequest(
      /*owner:*/ "joseph",
      /*repo_id:*/ "joseph/demo",
      /*parentDefaultHash:*/ "defaultHash10b",
      /*defaultHash:*/ "defaultHash10c",
      /*childDefaultHash:*/ "defaultHash10c",
      /*head:*/ "head",
      /*branchDefaultHash*/ "branchDefaultHash",
      /*remoteURL*/ "remoteURL",
      /*baseBranch:*/ "master",
      /*fork_branch:*/ "pullRequest10",
      /*title:*/ "feat: create linked pull request."
    );

    let thomasVote = await postSetVote(
      /*owner:*/ "joseph",
      /*repo:*/ "joseph/demo",
      /*defaultHash:*/ "defaultHash10b",
      /*childDefaultHash:*/ "defaultHash10c",
      /*mergeable:*/ true,
      /*contributor_id:*/ "0x0cBA86ac2Cd45DfA9bA798e86b24dCb074E92925",
      /*side*/ "yes"
    );

    const pullRequestLatest = await postGetMostRecentLinkedPullRequest(
      /*owner:*/ "joseph",
      /*repo:*/ "joseph/demo",
      /*defaultHash:*/ "defaultHash10",
      /*contributor:*/ "",
      /*side:*/ ""
    );
    const voteYesTotals = await postGetPRvoteYesTotals(
      /*owner:*/ "joseph",
      /*repo:*/ "joseph/demo",
      /*defaultHash:*/ "defaultHash10c",
      /*contributor:*/ "",
      /*side:*/ ""
    );

    const voteNoTotals = await postGetPRvoteNoTotals(
      /*owner:*/ "joseph",
      /*repo:*/ "joseph/demo",
      /*defaultHash:*/ "defaultHash10c",
      /*contributor:*/ "",
      /*side:*/ ""
    );

    const totalVotes = Number(voteYesTotals) + Number(voteNoTotals)

    console.log('michaelVote', michaelVote)
    console.log('gabrielVote', gabrielVote)
    console.log('magdaVote', magdaVote)
    console.log('thomasVote', thomasVote)

    console.log('totalVotes', totalVotes)

    console.log(pullRequestLatest, pullRequestLatest)

    console.log('issue_10b', issue_10b)

    console.log('issue_10c', issue_10c)

    assert.equal(totalVotes, 150_000, "Fail to rollover votes to linked pull request.");

    assert.equal(
      issue_10b,
      "201",
      "Failed to create a pull request issue_10 in the database"
    );
    assert.deepEqual(
      pullRequestLatest,
     { status: 200, state: "open", repo_id: "joseph/demo",  fork_branch: "pullRequest10", "childDefaultHash": "defaultHash10b", "defaultHash": "defaultHash10b", head: "head", branchDefaultHash: "branchDefaultHash", remoteURL: "remoteURL", baseBranch: "master" },
      "Fail to stay open."
    );
  });
});
