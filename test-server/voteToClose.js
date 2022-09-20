const assert = require("assert");
const {
  postSetVote,
  postGetPullRequest,
  postGetPRvoteYesTotals,
  postGetPRvoteNoTotals,
} = require("../src/requests");

let snooze_ms = 5000;

describe("Multiple voters vote to close Pull Request 2: defaultHash2", function () {
  this.timeout(snooze_ms * 12);
  it("Should set PR state to closed when majority is reached", async function () {
    let michaelVote = await postSetVote(
      /*owner:*/ "joseph",
      /*repo:*/ "joseph/demo",
      /*defaultHash:*/ "defaultHash2",
      /*contributor_id:*/ "0x0c55D3B26A1229B9D707a4272F55E66103301858",
      /*side:*/ "yes"
    );

    const voteYesTotals50000 = await postGetPRvoteYesTotals(
      /*owner:*/ "joseph",
      /*repo:*/ "joseph/demo",
      /*defaultHash:*/ "defaultHash2",
      /*contributor:*/ "",
      /*side:*/ ""
    );

    const voteNoTotals0 = await postGetPRvoteNoTotals(
      /*owner:*/ "joseph",
      /*repo:*/ "joseph/demo",
      /*defaultHash:*/ "defaultHash2",
      /*contributor_id:*/ "",
      /*side:*/ ""
    );

    const openStatus = await postGetPullRequest(
      /*owner:*/ "joseph",
      /*repo:*/ "joseph/demo",
      /*defaultHash:*/ "defaultHash2",
      /*contributor:*/ "",
      /*side:*/ ""
    );

    let gabrielVote = await postSetVote(
      /*owner:*/ "joseph",
      /*repo:*/ "joseph/demo",
      /*defaultHash:*/ "defaultHash2",
      /*contributor_id:*/ "0x0cf39Fb66C908A8aAb733F52BaDbf1ED58036983",
      /*side*/ "no"
    );

    const magdaVote = await postSetVote(
      /*owner:*/ "joseph",
      /*repo:*/ "joseph/demo",
      /*defaultHash:*/ "defaultHash2",
      /*contributor_id:*/ "0x0cBA86ac2Cd45DfA9bA798e86b24dCb074E92925",
      /*side*/ "no"
    );

    const thomasVote = await postSetVote(
      /*owner:*/ "joseph",
      /*repo:*/ "joseph/demo",
      /*defaultHash:*/ "defaultHash2",
      /*contributor_id:*/ "0x0c3B10A0B8bC506833A1CD54672a3b67502d7a53",
      /*side*/ "no"
    );

    const benVote = await postSetVote(
      /*owner:*/ "joseph",
      /*repo:*/ "joseph/demo",
      /*defaultHash:*/ "defaultHash2",
      /*contributor_id:*/ "0x0ceeed31E39a896CB5f69f1a05c013a7840A5f78",
      /*side*/ "no"
    );

    const louisVote = await postSetVote(
      /*owner:*/ "joseph",
      /*repo:*/ "joseph/demo",
      /*defaultHash:*/ "defaultHash2",
      /*contributor_id:*/ "0x0cea312808EdcdC905428D3922480930689F4500",
      /*side*/ "no"
    );

    const thibautVote = await postSetVote(
      /*owner:*/ "joseph",
      /*repo:*/ "joseph/demo",
      /*defaultHash:*/ "defaultHash2",
      /*contributor_id:*/ "0x0c587fB3EBA5e824Df543bDE5d972Fd9F7cFC164",
      /*side*/ "no"
    );

    const ignaciusVote = await postSetVote(
      /*owner:*/ "joseph",
      /*repo:*/ "joseph/demo",
      /*defaultHash:*/ "defaultHash2",
      /*contributor_id:*/ "0x0c16EFDc6e6490fd6066AB794Dc841A50eB5C90C",
      /*side*/ "no"
    );

    const maryVote = await postSetVote(
      /*owner:*/ "",
      /*repo:*/ "joseph/demo",
      /*defaultHash:*/ "defaultHash2",
      /*contributor_id:*/ "0x0cc59907e45614540dAa22Cf62520306439360f2",
      /*side:*/ "no"
    );

    const mergeStatus = await postGetPullRequest(
      /*owner:*/ "",
      /*repo:*/ "joseph/demo",
      /*defaultHash:*/ "defaultHash2",
      /*contributor_id:*/ "",
      /*side:*/ ""
    );

    assert.equal(michaelVote, 201, "Fail to add Michael's vote to database");
    assert.equal(voteYesTotals50000, "50000", "Fail to add votes yes.");
    assert.equal(voteNoTotals0, "0", "Fail to add votes no.");
    assert.deepEqual(
      openStatus,
      { status: 200, state: "open", repo_id: "joseph/demo",  fork_branch: "pullRequest2", "childDefaultHash": "defaultHash2", "defaultHash": "defaultHash2" },
      "Fail to stay open."
    );
    assert.equal(gabrielVote, 201, "Fail to add vote to database");
    assert.equal(magdaVote, 201, "Fail to add vote to database");
    assert.equal(thomasVote, 201, "Fail to add vote to database");
    assert.equal(benVote, 201, "Fail to add vote to database");
    assert.equal(louisVote, 201, "Fail to add vote to database");
    assert.equal(thibautVote, 201, "Fail to add vote to database");
    assert.equal(ignaciusVote, 201, "Fail to add vote to database");
    assert.equal(maryVote, 201, "Fail to add vote to database");
    assert.deepEqual(
      mergeStatus,
      { status: 200, state: "close", repo_id: "joseph/demo",  fork_branch: "pullRequest2", "childDefaultHash": "defaultHash2", "defaultHash": "defaultHash2" },
      "Fail to close even though it was voted against."
    );
  });
});
