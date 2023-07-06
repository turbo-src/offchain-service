const assert = require("assert");
const {
  postSetVote,
  postGetPullRequest,
  postGetPRvoteYesTotals,
  postGetPRvoteNoTotals,
  postCreatePullRequest,
} = require("../src/requests");

let snooze_ms = 5000;

describe("Pull request goes into conflict", function () {
  this.timeout(snooze_ms * 12);
  it("Should not vote if pr is in conflict - mergeable is false in setVote arguments", async function () {
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

    let gabrielVote = await postSetVote(
      /*owner:*/ "joseph",
      /*repo:*/ "joseph/demo",
      /*defaultHash:*/ "defaultHash8",
      /*childDefaultHash:*/ "defaultHash8",
      /*mergeable:*/ false,
      /*contributor_id:*/ "0x0cf39Fb66C908A8aAb733F52BaDbf1ED58036983",
      /*side*/ "yes"
    );

    const voteYesTotals50000After = await postGetPRvoteYesTotals(
      /*owner:*/ "joseph",
      /*repo:*/ "joseph/demo",
      /*defaultHash:*/ "defaultHash8",
      /*contributor:*/ "",
      /*side:*/ ""
    );

    assert.equal(michaelVote, 201, "Fail to add Michael's vote to database");
    assert.equal(voteYesTotals50000, 50000, "Fail to add votes yes.");
    assert.equal(
      voteYesTotals50000After,
      50000,
      "Fail to prevent adding more yes votes when the pr is in conflict."
    );
  });
});
