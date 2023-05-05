const assert = require("assert");
const { getVotes } = require("../src/requests");

describe("get votes", function () {
  it("should get all the votes for a pull request and their relevant data, contributor_id, votepower, side, timestamp", async function () {
    const res = await getVotes(
      /*repo:*/ "joseph/demo",
      /*defaultHash:*/ "defaultHash2",
      /*contributor_id*/ "0x0c55D3B26A1229B9D707a4272F55E66103301858"
    );
    assert.deepEqual(
      res.status,
       200,
       "Fail to get votes for a PR"
     );
     assert.deepEqual(
      res.voteData.contributor.voted,
       true,
       "Fail to get vote's votepower for a PR"
     );
});
});
