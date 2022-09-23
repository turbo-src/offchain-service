const assert = require("assert");
const {
  postSetVote,
  postGetPullRequest,
  postGetPRvoteYesTotals,
  postGetPRvoteNoTotals,
} = require("../src/requests");

let snooze_ms = 5000;

describe("Pull request goes into conflict", function () {
  this.timeout(snooze_ms * 12);
  it("Should leave PR state as in conflict if conflict not fixed", async function () {
    const newStatus = await postGetPullRequest(
      /*owner:*/ "joseph",
      /*repo:*/ "joseph/demo",
      /*defaultHash:*/ "defaultHash8b",
      /*contributor:*/ "",
      /*side:*/ ""
    );


    let michaelVoteLinkedPR = await postSetVote(
      /*owner:*/ "joseph",
      /*repo:*/ "joseph/demo",
      /*defaultHash:*/ "defaultHash8b",
      /*childDefaultHash:*/ "defaultHash8b",
      /*contributor_id:*/ "0x0c55D3B26A1229B9D707a4272F55E66103301858",
      /*side:*/ "yes"
    );
    const voteYesTotalsLinkedPR = await postGetPRvoteYesTotals(
      /*owner:*/ "joseph",
      /*repo:*/ "joseph/demo",
      /*defaultHash:*/ "defaultHash8b",
      /*contributor:*/ "",
      /*side:*/ ""
    );

    const voteNoTotalsLinkedPR = await postGetPRvoteNoTotals(
      /*owner:*/ "joseph",
      /*repo:*/ "joseph/demo",
      /*defaultHash:*/ "defaultHash8b",
      /*contributor_id:*/ "",
      /*side:*/ ""
    );

    const openStatusLinkedPR = await postGetPullRequest(
      /*owner:*/ "joseph",
      /*repo:*/ "joseph/demo",
      /*defaultHash:*/ "defaultHash8b",
      /*contributor:*/ "",
      /*side:*/ ""
    );

    let gabrielVoteLinkedPR = await postSetVote(
      /*owner:*/ "joseph",
      /*repo:*/ "joseph/demo",
      /*defaultHash:*/ "defaultHash8b",
      /*childDefaultHash:*/ "defaultHash8c",
      /*contributor_id:*/ "0x0cf39Fb66C908A8aAb733F52BaDbf1ED58036983",
      /*side*/ "yes"
    );

    const conflictStatusLinkedPR = await postGetPullRequest(
      /*owner:*/ "",
      /*repo:*/ "joseph/demo",
      /*defaultHash:*/ "defaultHash8b",
      /*contributor_id:*/ "",
      /*side:*/ ""
    );

    //let magdaVoteLinkedPR = await postSetVote(
    //  /*owner:*/ "joseph",
    //  /*repo:*/ "joseph/demo",
    //  /*defaultHash:*/ "defaultHash8b",
    //  /*childDefaultHash:*/ "defaultHash8b",
    //  /*contributor_id:*/ "0x0cf39Fb66C908A8aAb733F52BaDbf1ED58036983",
    //  /*side*/ "yes"
    //);

    assert.deepEqual(
      newStatus,
     { status: 200, state: "new", repo_id: "joseph/demo",  fork_branch: "pullRequest8b", "childDefaultHash": "defaultHash8b", "defaultHash": "defaultHash8b" },
      "Fail to be conflicted state."
    );

    assert.equal(michaelVoteLinkedPR, 201, "Fail to add Michael's vote to database");
    assert.equal(voteYesTotalsLinkedPR, "50000", "Fail to add votes yes.");
    assert.equal(voteNoTotalsLinkedPR, "0", "Fail to add votes no.");
    assert.deepEqual(
      openStatusLinkedPR,
     { status: 200, state: "open", repo_id: "joseph/demo",  fork_branch: "pullRequest8b", "childDefaultHash": "defaultHash8b", "defaultHash": "defaultHash8b" },
      "Fail to stay open."
    );

    assert.equal(gabrielVoteLinkedPR, 403, "fail to prevent conflict vote added to database");
    assert.deepEqual(
      conflictStatus,
     { status: 200, state: "open", repo_id: "joseph/demo",  fork_branch: "pullRequest8b", "childDefaultHash": "defaultHash8b", "defaultHash": "defaultHash8b" },
      "Fail to stay open even though it was vote on and did not exceed quorum"
    );

  });
});
