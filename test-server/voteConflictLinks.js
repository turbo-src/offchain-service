const assert = require("assert");
const {
  postSetVote,
  postGetPullRequest,
  postGetPRvoteYesTotals,
  postGetPRvoteNoTotals,
  postGetMostRecentLinkedPullRequest,
  createLinkedPullRequest
} = require("../src/requests");

let snooze_ms = 5000;

describe("Pull request goes into conflict", function () {
  this.timeout(snooze_ms * 12);
  it("Should leave PR state as in conflict if conflict not fixed", async function () {
    let michaelVote = await postSetVote(
      /*owner:*/ "joseph",
      /*repo:*/ "joseph/demo",
      /*defaultHash:*/ "defaultHash8",
      /*childDefaultHash:*/ "defaultHash8",
      /*mergeable:*/ true,
      /*contributor_id:*/ "0x0c55D3B26A1229B9D707a4272F55E66103301858",
      /*side:*/ "yes"
    );

    const voteYesTotals50000 = await postGetPRvoteYesTotals(
      /*owner:*/ "joseph",
      /*repo:*/ "joseph/demo",
      /*defaultHash:*/ "defaultHash8",
      /*contributor:*/ "",
      /*side:*/ ""
    );

    const voteNoTotals0 = await postGetPRvoteNoTotals(
      /*owner:*/ "joseph",
      /*repo:*/ "joseph/demo",
      /*defaultHash:*/ "defaultHash8",
      /*contributor_id:*/ "",
      /*side:*/ ""
    );

    const openStatus = await postGetPullRequest(
      /*owner:*/ "joseph",
      /*repo:*/ "joseph/demo",
      /*defaultHash:*/ "defaultHash8",
      /*contributor:*/ "",
      /*side:*/ ""
    );

    let gabrielVote = await postSetVote(
      /*owner:*/ "joseph",
      /*repo:*/ "joseph/demo",
      /*defaultHash:*/ "defaultHash8",
      /*childDefaultHash:*/ "defaultHash8b",
      /*mergeable:*/ false,
      /*contributor_id:*/ "0x0cf39Fb66C908A8aAb733F52BaDbf1ED58036983",
      /*side*/ "yes"
    );

    const linkedPR8b = await createLinkedPullRequest(
      /*owner:*/ "joseph",
      /*repo_id:*/ "joseph/demo",
      /*parentDefaultHash:*/ "defaultHash8",
      /*defaultHash:*/ "defaultHash8",
      /*childDefaultHash:*/ "defaultHash8b",
      /*head:*/ "defaultHash8b",
      /*branchDefaultHash*/ "branchDefaultHash",
      /*remoteURL*/ "remoteURL",
      /*baseBranch:*/ "master",
      /*fork_branch:*/ "pullRequest8",
      /*title:*/ "feat: create linked pull request."
    );

    assert.equal(linkedPR8b, '201', 'failed to create linked pull request')

    const voteYesTotals50000After = await postGetPRvoteYesTotals(
      /*owner:*/ "joseph",
      /*repo:*/ "joseph/demo",
      /*defaultHash:*/ "defaultHash8",
      /*contributor:*/ "",
      /*side:*/ ""
    );

    const voteNoTotals0After = await postGetPRvoteNoTotals(
      /*owner:*/ "joseph",
      /*repo:*/ "joseph/demo",
      /*defaultHash:*/ "defaultHash8",
      /*contributor_id:*/ "",
      /*side:*/ ""
    );

    const mergeStatus = await postGetMostRecentLinkedPullRequest(
      /*owner:*/ "",
      /*repo:*/ "joseph/demo",
      /*defaultHash:*/ "defaultHash8",
      /*contributor_id:*/ "",
      /*side:*/ ""
    );

    assert.equal(michaelVote, 201, "Fail to add Michael's vote to database");
    assert.equal(voteYesTotals50000, "50000", "Fail to add votes yes.");
    assert.equal(voteNoTotals0, "0", "Fail to add votes no.");
    assert.equal(voteYesTotals50000After, "50000", "Fail to prevent adding yes votes on conflict.");
    assert.equal(voteNoTotals0After, "0", "Fail to prevent adding no votes on conflict.");
    assert.deepEqual(
      openStatus,
     { status: 200, state: "pre-open", repo_id: "joseph/demo",  fork_branch: "pullRequest8", "childDefaultHash": "defaultHash8", "defaultHash": "defaultHash8", head: "head", branchDefaultHash: "branchDefaultHash", remoteURL: "remoteURL", baseBranch: "master" },
      "Fail to stay open."
    );

    assert.equal(gabrielVote, 403, "Fail to prevent adding vote to database when vote is conflict");
    assert.deepEqual(
      mergeStatus,
     { status: 200, state: "conflict", repo_id: "joseph/demo",  fork_branch: "pullRequest8", "childDefaultHash": "defaultHash8b", "defaultHash": "defaultHash8", head: "defaultHash8b", branchDefaultHash: "branchDefaultHash", remoteURL: "remoteURL", baseBranch: "master" },
      "Fail to stay open even though it was vote on and did not exceed quorum"
    );

  });
});
