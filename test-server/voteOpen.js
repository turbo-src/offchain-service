const assert = require("assert");
const {
  postSetVote,
  postGetPRStatus,
  postGetVoteYesTotals,
  postGetVoteNoTotals,
} = require("../src/requests");

let snooze_ms = 5000;

describe("Not enough voters vote to exceed quorum", function () {
  this.timeout(snooze_ms * 12);
  it("Should leave PR status as open if quorum is not exceeded", async function () {
    let michaelVote = await postSetVote(
      /*owner:*/ "joseph",
      /*repo:*/ "joseph/demo",
      /*pr_id:*/ "pullRequest3",
      /*contributor_id:*/ "0x0c55D3B26A1229B9D707a4272F55E66103301858",
      /*side:*/ "yes"
    );
    await snooze(snooze_ms);

    const voteYesTotals50000 = await postGetVoteYesTotals(
      /*owner:*/ "joseph",
      /*repo:*/ "joseph/demo",
      /*pr_id:*/ "pullRequest3",
      /*contributor:*/ "",
      /*side:*/ ""
    );
    await snooze(snooze_ms);

    const voteNoTotals0 = await postGetVoteNoTotals(
      /*owner:*/ "joseph",
      /*repo:*/ "joseph/demo",
      /*pr_id:*/ "pullRequest3",
      /*contributor_id:*/ "",
      /*side:*/ ""
    );
    await snooze(snooze_ms);

    const openStatus = await postGetPRStatus(
      /*owner:*/ "joseph",
      /*repo:*/ "joseph/demo",
      /*pr_id:*/ "pullRequest3",
      /*contributor:*/ "",
      /*side:*/ ""
    );
    await snooze(snooze_ms);

    let gabrielVote = await postSetVote(
      /*owner:*/ "joseph",
      /*repo:*/ "joseph/demo",
      /*pr_id:*/ "pullRequest3",
      /*contributor_id:*/ "0x0cf39Fb66C908A8aAb733F52BaDbf1ED58036983",
      /*side*/ "yes"
    );
    await snooze(snooze_ms);

    const mergeStatus = await postGetPRStatus(
      /*owner:*/ "",
      /*repo:*/ "joseph/demo",
      /*pr_id:*/ "pullRequest3",
      /*contributor_id:*/ "",
      /*side:*/ ""
    );
    await snooze(snooze_ms);

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
