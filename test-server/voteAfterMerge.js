const assert = require("assert");
const {
  postSetVote,
  postGetPullRequest,
  postGetPRvoteYesTotals,
  postGetPRvoteNoTotals,
} = require("../src/requests");

let snooze_ms = 5000;

describe("Multiple voters vote to merge Pull Request 1: defaultHash5", function () {
  this.timeout(snooze_ms * 12);
  it("Should add votes to the votes table, add yes/noTokensAmount to the pullRequest table, set PR state to merge when majority is reached", async function () {
    const maryVote = await postSetVote(
      /*owner:*/ "",
      /*repo:*/ "joseph/demo",
      /*defaultHash:*/ "defaultHash5",
      /*childDefaultHash:*/ "defaultHash5",
      /*mergeable:*/ true,
      /*contributor_id:*/ "0x0cc59907e45614540dAa22Cf62520306439360f2",
      /*side:*/ "yes"
    );
    const voteYesTotalsMerge = await postGetPRvoteYesTotals(
      /*owner:*/ "joseph",
      /*repo:*/ "joseph/demo",
      /*defaultHash:*/ "defaultHash5",
      /*contributor:*/ "",
      /*side:*/ ""
    );

    const voteNoTotalsMerge = await postGetPRvoteNoTotals(
      /*owner:*/ "joseph",
      /*repo:*/ "joseph/demo",
      /*defaultHash:*/ "defaultHash5",
      /*contributor_id:*/ "",
      /*side:*/ ""
    );

    const mergeStatus = await postGetPullRequest(
      /*owner:*/ "joseph",
      /*repo:*/ "joseph/demo",
      /*defaultHash:*/ "defaultHash5",
      /*contributor:*/ "",
      /*side:*/ ""
    );

    let michaelVote = await postSetVote(
      /*owner:*/ "joseph",
      /*repo:*/ "joseph/demo",
      /*defaultHash:*/ "defaultHash5",
      /*childDefaultHash:*/ "defaultHash5",
      /*mergeable:*/ true,
      /*contributor_id:*/ "0x0c55D3B26A1229B9D707a4272F55E66103301858",
      /*side:*/ "yes"
    );
    const voteYesTotalsAfterMerge = await postGetPRvoteYesTotals(
      /*owner:*/ "joseph",
      /*repo:*/ "joseph/demo",
      /*defaultHash:*/ "defaultHash5",
      /*contributor:*/ "",
      /*side:*/ ""
    );

    const voteNoTotalsAfterMerge = await postGetPRvoteNoTotals(
      /*owner:*/ "joseph",
      /*repo:*/ "joseph/demo",
      /*defaultHash:*/ "defaultHash5",
      /*contributor_id:*/ "",
      /*side:*/ ""
    );

    const afterMergeStatus = await postGetPullRequest(
      /*owner:*/ "joseph",
      /*repo:*/ "joseph/demo",
      /*defaultHash:*/ "defaultHash5",
      /*contributor:*/ "",
      /*side:*/ ""
    );

    assert.equal(maryVote, 201, "Fail to add vote to database");
    assert.equal(voteYesTotalsMerge, "500001", "Fail to add votes yes.");
    assert.equal(voteNoTotalsMerge, "0", "Fail to add votes no.");
    assert.deepEqual(
      mergeStatus,
     { status: 200, state: "merge", repo_id: "joseph/demo",  fork_branch: "pullRequest5", "childDefaultHash": "defaultHash5", "defaultHash": "defaultHash5" },
      "Fail to merge even though it was voted in."
    );

    assert.equal(michaelVote, "403", "Fail to add Michael's vote to database");
    assert.equal(voteYesTotalsAfterMerge, "500001", "Fail to add votes yes.");
    assert.equal(voteNoTotalsAfterMerge, "0", "Fail to add votes no.");
    assert.deepEqual(
      afterMergeStatus,
     { status: 200, state: "merge", repo_id: "joseph/demo",  fork_branch: "pullRequest5", "childDefaultHash": "defaultHash5", "defaultHash": "defaultHash5" },
      "Fail to merge even though it was voted in."
    );
  });
});
