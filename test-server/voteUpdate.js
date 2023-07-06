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
  it("Should allow vote on update", async function () {
    let michaelVote = await postSetVote(
      /*owner:*/ "joseph",
      /*repo:*/ "joseph/demo",
      /*defaultHash:*/ "defaultHash9",
      /*childDefaultHash:*/ "defaultHash9",
      /*mergeable:*/ true,
      /*contributor_id:*/ "0x0c55D3B26A1229B9D707a4272F55E66103301858",
      /*side:*/ "yes"
    );

    const voteYesTotals50000 = await postGetPRvoteYesTotals(
      /*owner:*/ "joseph",
      /*repo:*/ "joseph/demo",
      /*defaultHash:*/ "defaultHash9",
      /*contributor:*/ "",
      /*side:*/ ""
    );

    const voteNoTotals0 = await postGetPRvoteNoTotals(
      /*owner:*/ "joseph",
      /*repo:*/ "joseph/demo",
      /*defaultHash:*/ "defaultHash9",
      /*contributor_id:*/ "",
      /*side:*/ ""
    );

    const openStatus = await postGetPullRequest(
      /*owner:*/ "joseph",
      /*repo:*/ "joseph/demo",
      /*defaultHash:*/ "defaultHash9",
      /*contributor:*/ "",
      /*side:*/ ""
    );

    let gabrielVote = await postSetVote(
      /*owner:*/ "joseph",
      /*repo:*/ "joseph/demo",
      /*defaultHash:*/ "defaultHash9",
      /*childDefaultHash:*/ "defaultHash9b",
      /*mergeable:*/ true,
      /*contributor_id:*/ "0x0cf39Fb66C908A8aAb733F52BaDbf1ED58036983",
      /*side*/ "yes"
    );

    const mergeStatus = await postGetPullRequest(
      /*owner:*/ "",
      /*repo:*/ "joseph/demo",
      /*defaultHash:*/ "defaultHash9",
      /*contributor_id:*/ "",
      /*side:*/ ""
    );

    assert.equal(michaelVote, 201, "Fail to add Michael's vote to database");
    assert.equal(voteYesTotals50000, "50000", "Fail to add votes yes.");
    assert.equal(voteNoTotals0, "0", "Fail to add votes no.");
    assert.deepEqual(
      openStatus,
      {
        status: 200,
        state: "open",
        repo_id: "joseph/demo",
        fork_branch: "pullRequest9",
        childDefaultHash: "defaultHash9",
        defaultHash: "defaultHash9",
        head: "head",
        branchDefaultHash: "branchDefaultHash",
        remoteURL: "remoteURL",
        baseBranch: "master",
      },
      "Fail to stay open."
    );

    assert.equal(
      gabrielVote,
      403,
      "Fail to prevent adding vote to database when vote is conflict"
    );
    assert.deepEqual(
      mergeStatus,
      {
        status: 200,
        state: "update",
        repo_id: "joseph/demo",
        fork_branch: "pullRequest9",
        childDefaultHash: "defaultHash9b",
        defaultHash: "defaultHash9",
        head: "head",
        branchDefaultHash: "branchDefaultHash",
        remoteURL: "remoteURL",
        baseBranch: "master",
      },
      "Fail to stay open even though it was vote on and did not exceed quorum"
    );
  });
});
