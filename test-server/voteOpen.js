const assert = require("assert");
const {
  postSetVote,
  postGetPullRequest,
  postGetPRvoteYesTotals,
  postGetPRvoteNoTotals,
} = require("../src/requests");

let snooze_ms = 5000;

describe("Not enough voters vote to exceed quorum", function () {
  this.timeout(snooze_ms * 12);
  it("Should leave PR state as open if quorum is not exceeded", async function () {
    let michaelVote = await postSetVote(
      /*owner:*/ "joseph",
      /*repo:*/ "joseph/demo",
      /*defaultHash:*/ "defaultHash3",
      /*childDefaultHash:*/ "defaultHash3",
      /*mergeable:*/ true,
      /*contributor_id:*/ "0x0c55D3B26A1229B9D707a4272F55E66103301858",
      /*side:*/ "yes"
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

    const thomasVote = await postSetVote(
      /*owner:*/ "joseph",
      /*repo:*/ "joseph/demo",
      /*defaultHash:*/ "defaultHash3",
      /*childDefaultHash:*/ "defaultHash3",
      /*mergeable:*/ true,
      /*contributor_id:*/ "0x0c3B10A0B8bC506833A1CD54672a3b67502d7a53",
      /*side*/ "no"
    );

    const benVote = await postSetVote(
      /*owner:*/ "joseph",
      /*repo:*/ "joseph/demo",
      /*defaultHash:*/ "defaultHash3",
      /*childDefaultHash:*/ "defaultHash3",
      /*mergeable:*/ true,
      /*contributor_id:*/ "0x0ceeed31E39a896CB5f69f1a05c013a7840A5f78",
      /*side*/ "no"
    );

    const louisVote = await postSetVote(
      /*owner:*/ "joseph",
      /*repo:*/ "joseph/demo",
      /*defaultHash:*/ "defaultHash3",
      /*childDefaultHash:*/ "defaultHash3",
      /*mergeable:*/ true,
      /*contributor_id:*/ "0x0cea312808EdcdC905428D3922480930689F4500",
      /*side*/ "no"
    );

    const thibautVote = await postSetVote(
      /*owner:*/ "joseph",
      /*repo:*/ "joseph/demo",
      /*defaultHash:*/ "defaultHash3",
      /*childDefaultHash:*/ "defaultHash3",
      /*mergeable:*/ true,
      /*contributor_id:*/ "0x0c587fB3EBA5e824Df543bDE5d972Fd9F7cFC164",
      /*side*/ "yes"
    );

    const ignaciusVote = await postSetVote(
      /*owner:*/ "joseph",
      /*repo:*/ "joseph/demo",
      /*defaultHash:*/ "defaultHash3",
      /*childDefaultHash:*/ "defaultHash3",
      /*mergeable:*/ true,
      /*contributor_id:*/ "0x0c16EFDc6e6490fd6066AB794Dc841A50eB5C90C",
      /*side*/ "yes"
    );
    const openStatus = await postGetPullRequest(
      /*owner:*/ "joseph",
      /*repo:*/ "joseph/demo",
      /*defaultHash:*/ "defaultHash3",
      /*contributor:*/ "",
      /*side:*/ ""
    );

    assert.equal(michaelVote, 201, "Fail to add Michael's vote to database");
    assert.equal(gabrielVote, 201, "Fail to add vote to database");

    assert.deepEqual(
      openStatus,
      {
        status: 200,
        state: "open",
        repo_id: "joseph/demo",
        fork_branch: "pullRequest3",
        childDefaultHash: "defaultHash3",
        defaultHash: "defaultHash3",
        head: "head",
        branchDefaultHash: "branchDefaultHash",
        remoteURL: "remoteURL",
        baseBranch: "master",
      },
      "Fail to stay open."
    );
  });
});
