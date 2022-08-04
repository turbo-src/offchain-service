const assert = require("assert");
const {
  getVoteStatus,
  setVote,
  getVoteYesTotals,
  getVoteNoTotals,
} = require("../lib");

var snooze_ms = 5000

// We call this at the top of each test case, otherwise nodeosd could
// throw duplication errors (ie, data races).
const snooze = ms => new Promise(resolve => setTimeout(resolve, ms));

describe("Not enough voters vote to exceed quorum", function () {
  it("Should leave PR status as open if quorum is not exceeded", async function () {
    this.timeout(snooze_ms*12);
    let michaelVote = await setVote(
      /*owner:*/ "joseph",
      /*repo:*/ "joseph/demo",
      /*pr_id:*/ "issue_3",
      /*contributor_id:*/ "0x0c55D3B26A1229B9D707a4272F55E66103301858",
      /*side:*/ "yes"
    );

    const voteYesTotals50000 = await getVoteYesTotals(
      /*owner:*/ "joseph",
      /*repo:*/ "joseph/demo",
      /*pr_id:*/ "issue_3",
      /*contributor:*/ "",
      /*side:*/ ""
    );

    const voteNoTotals0 = await getVoteNoTotals(
      /*owner:*/ "joseph",
      /*repo:*/ "joseph/demo",
      /*pr_id:*/ "issue_3",
      /*contributor_id:*/ "",
      /*side:*/ ""
    );

    const openStatus = await getVoteStatus(
      /*owner:*/ "joseph",
      /*repo:*/ "joseph/demo",
      /*pr_id:*/ "issue_3",
      /*contributor:*/ "",
      /*side:*/ ""
    );

    let gabrielVote = await setVote(
      /*owner:*/ "joseph",
      /*repo:*/ "joseph/demo",
      /*pr_id:*/ "issue_3",
      /*contributor_id:*/ "0x0cf39Fb66C908A8aAb733F52BaDbf1ED58036983",
      /*side*/ "yes"
    );

    const mergeStatus = await getVoteStatus(
      /*owner:*/ "",
      /*repo:*/ "joseph/demo",
      /*pr_id:*/ "issue_3",
      /*contributor_id:*/ "",
      /*side:*/ ""
    );

    assert.equal(michaelVote, 201, "Fail to add Michael's vote to database");
    assert.equal(voteYesTotals50000, "50000", "Fail to add votes yes.");
    assert.equal(voteNoTotals0, "0", "Fail to add votes no.");
    assert.equal(openStatus, "open", "Fail to stay open.");
    assert.equal(gabrielVote, 201, "Fail to add vote to database");

    assert.equal(
      mergeStatus,
      "open",
      "Fail to stay open even though it was vote on and did not exceed quorum"
    );
  });
});
