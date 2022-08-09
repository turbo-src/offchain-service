const assert = require("assert");
const {
  postSetVote,
  postGetVoteYesTotals,
  postGetPRStatus,
  postGetVoteNoTotals,
} = require("../src/requests");

let snooze_ms = 5000;

describe("Multiple voters vote to close Pull Request 2: pullRequest2", function () {
  this.timeout(snooze_ms * 12);
  it("Should set PR status to closed when majority is reached", async function () {
    let michaelVote = await postSetVote(
      /*owner:*/ "joseph",
      /*repo:*/ "joseph/demo",
      /*pr_id:*/ "pullRequest2",
      /*contributor_id:*/ "0x0c55D3B26A1229B9D707a4272F55E66103301858",
      /*side:*/ "yes"
    );
    await snooze(snooze_ms);

    const voteYesTotals50000 = await postGetVoteYesTotals(
      /*owner:*/ "joseph",
      /*repo:*/ "joseph/demo",
      /*pr_id:*/ "pullRequest2",
      /*contributor:*/ "",
      /*side:*/ ""
    );
    await snooze(snooze_ms);

    const voteNoTotals0 = await postGetVoteNoTotals(
      /*owner:*/ "joseph",
      /*repo:*/ "joseph/demo",
      /*pr_id:*/ "pullRequest2",
      /*contributor_id:*/ "",
      /*side:*/ ""
    );
    await snooze(snooze_ms);

    const openStatus = await postGetPRStatus(
      /*owner:*/ "joseph",
      /*repo:*/ "joseph/demo",
      /*pr_id:*/ "pullRequest2",
      /*contributor:*/ "",
      /*side:*/ ""
    );
    await snooze(snooze_ms);

    let gabrielVote = await postSetVote(
      /*owner:*/ "joseph",
      /*repo:*/ "joseph/demo",
      /*pr_id:*/ "pullRequest2",
      /*contributor_id:*/ "0x0cf39Fb66C908A8aAb733F52BaDbf1ED58036983",
      /*side*/ "no"
    );
    await snooze(snooze_ms);

    const magdaVote = await postSetVote(
      /*owner:*/ "joseph",
      /*repo:*/ "joseph/demo",
      /*pr_id:*/ "pullRequest2",
      /*contributor_id:*/ "0x0cBA86ac2Cd45DfA9bA798e86b24dCb074E92925",
      /*side*/ "no"
    );
    await snooze(snooze_ms);

    const thomasVote = await postSetVote(
      /*owner:*/ "joseph",
      /*repo:*/ "joseph/demo",
      /*pr_id:*/ "pullRequest2",
      /*contributor_id:*/ "0x0c3B10A0B8bC506833A1CD54672a3b67502d7a53",
      /*side*/ "no"
    );
    await snooze(snooze_ms);

    const benVote = await postSetVote(
      /*owner:*/ "joseph",
      /*repo:*/ "joseph/demo",
      /*pr_id:*/ "pullRequest2",
      /*contributor_id:*/ "0x0ceeed31E39a896CB5f69f1a05c013a7840A5f78",
      /*side*/ "no"
    );
    await snooze(snooze_ms);

    const louisVote = await postSetVote(
      /*owner:*/ "joseph",
      /*repo:*/ "joseph/demo",
      /*pr_id:*/ "pullRequest2",
      /*contributor_id:*/ "0x0cea312808EdcdC905428D3922480930689F4500",
      /*side*/ "no"
    );
    await snooze(snooze_ms);

    const thibautVote = await postSetVote(
      /*owner:*/ "joseph",
      /*repo:*/ "joseph/demo",
      /*pr_id:*/ "pullRequest2",
      /*contributor_id:*/ "0x0c587fB3EBA5e824Df543bDE5d972Fd9F7cFC164",
      /*side*/ "no"
    );
    await snooze(snooze_ms);

    const ignaciusVote = await postSetVote(
      /*owner:*/ "joseph",
      /*repo:*/ "joseph/demo",
      /*pr_id:*/ "pullRequest2",
      /*contributor_id:*/ "0x0c16EFDc6e6490fd6066AB794Dc841A50eB5C90C",
      /*side*/ "no"
    );
    await snooze(snooze_ms);

    const mergeStatus = await postGetPRStatus(
      /*owner:*/ "",
      /*repo:*/ "joseph/demo",
      /*pr_id:*/ "pullRequest2",
      /*contributor_id:*/ "",
      /*side:*/ ""
    );
    await snooze(snooze_ms);

    assert.equal(michaelVote, 201, "Fail to add Michael's vote to database");
    assert.equal(voteYesTotals50000, "50000", "Fail to add votes yes.");
    assert.equal(voteNoTotals0, "0", "Fail to add votes no.");
    assert.equal(openStatus, "open", "Fail to stay open.");
    assert.equal(gabrielVote, 201, "Fail to add vote to database");
    assert.equal(magdaVote, 201, "Fail to add vote to database");
    assert.equal(thomasVote, 201, "Fail to add vote to database");
    assert.equal(benVote, 201, "Fail to add vote to database");
    assert.equal(louisVote, 201, "Fail to add vote to database");
    assert.equal(thibautVote, 201, "Fail to add vote to database");
    assert.equal(ignaciusVote, 201, "Fail to add vote to database");
    assert.equal(
      mergeStatus,
      "close",
      "Fail to close even though it was voted against."
    );
  });
});
