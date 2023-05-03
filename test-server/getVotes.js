const assert = require("assert");
const { getVotes } = require("../src/requests");

describe("get votes", function () {
  it("should get all the votes for a pull request and their relevant data, contributor_id, votepower, side, timestamp", async function () {
    const voteData = await getVotes(
      /*repo:*/ "joseph/demo",
      /*defaultHash:*/ "defaultHash2",
    );
    assert.deepEqual(
      voteData.status,
       200,
       "Fail to get votes for a PR"
     );
     assert.deepEqual(
      voteData.votes[0].votePower,
       '50000',
       "Fail to get vote's votepower for a PR"
     );
    assert.deepEqual(
      voteData.votes[0].contributor_id,
       '0x0c55D3B26A1229B9D707a4272F55E66103301858',
       "Fail to get vote's contributor_id for a PR"
     );
    assert.deepEqual(
      voteData.votes[0].side,
      'yes',
      "Fail to get vote's side for a PR"
    );
});
});
