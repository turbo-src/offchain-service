const assert = require("assert");
const fsPromises = require('fs').promises;
const {
  postSetVote,
  postGetPullRequest,
  postGetPRvoteYesTotals,
  postGetPRvoteNoTotals,
} = require("../src/requests");

var snooze_ms = 1500;

// We call this at the top of each test case, otherwise nodeosd could
// throw duplication errors (ie, data races).
const snooze = ms => new Promise(resolve => setTimeout(resolve, ms));

describe("Not enough voters vote to exceed quorum", function () {
  this.timeout(snooze_ms * 12);
  it("Should leave PR state as open if quorum is not exceeded", async function () {
    await snooze(snooze_ms);

    let michaelVote = await postSetVote(
      /*owner:*/ "joseph",
      /*repo:*/ "joseph/demo",
      /*defaultHash:*/ "defaultHash3",
      /*childDefaultHash:*/ "defaultHash3",
      /*mergeable:*/ true,
      /*contributor_id:*/ "0x0c55D3B26A1229B9D707a4272F55E66103301858",
      /*side:*/ "yes"
    );

    const voteYesTotals50000 = await postGetPRvoteYesTotals(
      /*owner:*/ "joseph",
      /*repo:*/ "joseph/demo",
      /*defaultHash:*/ "defaultHash3",
      /*contributor:*/ "",
      /*side:*/ ""
    );

    const voteNoTotals0 = await postGetPRvoteNoTotals(
      /*owner:*/ "joseph",
      /*repo:*/ "joseph/demo",
      /*defaultHash:*/ "defaultHash3",
      /*contributor_id:*/ "",
      /*side:*/ ""
    );

    const openStatus = await postGetPullRequest(
      /*owner:*/ "joseph",
      /*repo:*/ "joseph/demo",
      /*defaultHash:*/ "defaultHash3",
      /*contributor:*/ "",
      /*side:*/ ""
    );

    let gabrielVote = await postSetVote(
      /*owner:*/ "joseph",
      /*repo:*/ "joseph/demo",
      /*defaultHash:*/ "defaultHash3",
      /*childDefaultHash:*/ "defaultHash3",
      /*mergeable:*/ true,
      /*contributor_id:*/ "0x0cf39Fb66C908A8aAb733F52BaDbf1ED58036983",
      /*side*/ "yes"
    );

    const mergeStatus = await postGetPullRequest(
      /*owner:*/ "",
      /*repo:*/ "joseph/demo",
      /*defaultHash:*/ "defaultHash3",
      /*contributor_id:*/ "",
      /*side:*/ ""
    );

    assert.equal(michaelVote, '201', "Fail to add Michael's vote to database");
    assert.equal(voteYesTotals50000, "50000", "Fail to add votes yes.");
    assert.equal(voteNoTotals0, "0", "Fail to add votes no.");
    assert.deepEqual(
      openStatus,
     { status: 200, state: "pre-open", repo_id: "joseph/demo",  fork_branch: "pullRequest3", "childDefaultHash": "defaultHash3", "defaultHash": "defaultHash3", head: "head", branchDefaultHash: "branchDefaultHash", remoteURL: "remoteURL", baseBranch: "master" },
      "Fail to stay open."
    );
    assert.equal(gabrielVote, '201', "Fail to add vote to database");

    assert.deepEqual(
      mergeStatus,
     { status: 200, state: "open", repo_id: "joseph/demo",  fork_branch: "pullRequest3", "childDefaultHash": "defaultHash3", "defaultHash": "defaultHash3", head: "head", branchDefaultHash: "branchDefaultHash", remoteURL: "remoteURL", baseBranch: "master" },
      "Fail to stay open even though it was vote on and did not exceed quorum"
    );

  });
});
