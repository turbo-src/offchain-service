const assert = require("assert");
const { getContributorID } = require("../lib");

describe("getContributorID", function () {
  it("should return a contributor's id (ethereum address) based on their name (github login)", async function () {
    let contributorId = await getContributorID("michael");

    assert.equal(
      contributorId,
      "0x0c55D3B26A1229B9D707a4272F55E66103301858",
      "Failed to get a contributor's id based on their name"
    );
  });
});
