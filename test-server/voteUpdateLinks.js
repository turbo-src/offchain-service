const assert = require("assert");
const {
  postSetVote,
  postGetPullRequest,
  postGetPRvoteYesTotals,
  postGetPRvoteNoTotals,
} = require("../src/requests");

let snooze_ms = 5000;

describe("Pull request is updated", function () {
  this.timeout(snooze_ms * 12);
  it("Should vote on updated PR and not old one", async function () {
    const newStatus = await postGetPullRequest(
      /*owner:*/ "joseph",
      /*repo:*/ "joseph/demo",
      /*defaultHash:*/ "defaultHash9b",
      /*contributor:*/ "",
      /*side:*/ ""
    );


    let michaelVoteLinkedPR = await postSetVote(
      /*owner:*/ "joseph",
      /*repo:*/ "joseph/demo",
      /*defaultHash:*/ "defaultHash9b",
      /*childDefaultHash:*/ "defaultHash9b",
      /*mergeable:*/ true,
      /*contributor_id:*/ "0x0c55D3B26A1229B9D707a4272F55E66103301858",
      /*side:*/ "yes"
    );
    const voteYesTotalsLinkedPR = await postGetPRvoteYesTotals(
      /*owner:*/ "joseph",
      /*repo:*/ "joseph/demo",
      /*defaultHash:*/ "defaultHash9b",
      /*contributor:*/ "",
      /*side:*/ ""
    );

    const voteNoTotalsLinkedPR = await postGetPRvoteNoTotals(
      /*owner:*/ "joseph",
      /*repo:*/ "joseph/demo",
      /*defaultHash:*/ "defaultHash9b",
      /*contributor_id:*/ "",
      /*side:*/ ""
    );

    const pullRequest9b = await postGetPullRequest(
      /*owner:*/ "joseph",
      /*repo:*/ "joseph/demo",
      /*defaultHash:*/ "defaultHash9b",
      /*contributor:*/ "",
      /*side:*/ ""
    );

    let gabrielVoteLinkedPR = await postSetVote(
      /*owner:*/ "joseph",
      /*repo:*/ "joseph/demo",
      /*defaultHash:*/ "defaultHash9b",
      /*childDefaultHash:*/ "defaultHash9c",
      /*mergeable:*/ true,
      /*contributor_id:*/ "0x0cf39Fb66C908A8aAb733F52BaDbf1ED58036983",
      /*side*/ "yes"
    );

    const pullRequest9bConflict = await postGetPullRequest(
      /*owner:*/ "",
      /*repo:*/ "joseph/demo",
      /*defaultHash:*/ "defaultHash9b",
      /*contributor_id:*/ "",
      /*side:*/ ""
    );

    //let magdaVoteLinkedPR = await postSetVote(
    //  /*owner:*/ "joseph",
    //  /*repo:*/ "joseph/demo",
    //  /*defaultHash:*/ "defaultHash9b",
    //  /*childDefaultHash:*/ "defaultHash9b",
    //  /*mergeable:*/ true,
    //  /*contributor_id:*/ "0x0cf39Fb66C908A8aAb733F52BaDbf1ED58036983",
    //  /*side*/ "yes"
    //);

    assert.deepEqual(
      newStatus,
     { status: 200, state: "new", repo_id: "joseph/demo",  fork_branch: "pullRequest9b", "childDefaultHash": "defaultHash9b", "defaultHash": "defaultHash9b", head: "head", branchDefaultHash: "branchDefaultHash", remoteURL: "remoteURL", baseBranch: "master" },
      "Fail to be new state."
    );

    assert.equal(michaelVoteLinkedPR, 201, "Fail to add Michael's vote to database");
    assert.equal(voteYesTotalsLinkedPR, "50000", "Fail to add votes yes.");
    assert.equal(voteNoTotalsLinkedPR, "0", "Fail to add votes no.");
    assert.deepEqual(
      pullRequest9b,
     { status: 200, state: "pre-open", repo_id: "joseph/demo",  fork_branch: "pullRequest9b", "childDefaultHash": "defaultHash9b", "defaultHash": "defaultHash9b", head: "head", branchDefaultHash: "branchDefaultHash", remoteURL: "remoteURL", baseBranch: "master" },
      "Fail to stay open."
    );

    assert.equal(gabrielVoteLinkedPR, 403, "fail to prevent vote on PR parent that was updated");
    assert.deepEqual(
      pullRequest9bConflict,
     { status: 200, state: "update", repo_id: "joseph/demo",  fork_branch: "pullRequest9b", "childDefaultHash": "defaultHash9c", "defaultHash": "defaultHash9b", head: "head", branchDefaultHash: "branchDefaultHash", remoteURL: "remoteURL", baseBranch: "master" },
      "Fail to stay open even though it was vote on and did not exceed quorum"
    );

  });
});
