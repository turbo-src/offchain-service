const assert = require("assert");
const { postSetVote } = require("../src/requests");

let snooze_ms = 5000;

describe("Voting on the same default hash for different repos should be allowed", function () {
  this.timeout(snooze_ms * 12);
  it("Should check if a vote with the contributor's id and pullrequest's id has been created. If so, return 403.", async function () {
    const gabrielVote1 = await postSetVote(
      /*owner:*/ "joseph",
      /*repo:*/ "joseph/demo",
      /*defaultHash:*/ "defaultHash3",
      /*childDefaultHash:*/ "defaultHash3",
      /*mergeable:*/ true,
      /*contributor_id:*/ "0x0cf39Fb66C908A8aAb733F52BaDbf1ED58036983",
      /*side:*/ "yes"
    );
    const gabrielVote2 = await postSetVote(
      /*owner:*/ "michael",
      /*repo:*/ "michael/demo",
      /*defaultHash:*/ "defaultHash3",
      /*childDefaultHash:*/ "defaultHash3",
      /*mergeable:*/ true,
      /*contributor_id:*/ "0x0c55D3B26A1229B9D707a4272F55E66103301858",
      /*side:*/ "yes"
    );

    assert.equal(gabrielVote1, 403);

    assert.equal(gabrielVote2, 201);
  });
});