const assert = require("assert");
const { postGetContributorSignature } = require("../src/requests");

describe("postGetContributorSignature", function () {
  it("should return a contributor's signature (ethereum key) based on their name (github login)", async function () {
    let contributorId = await postGetContributorSignature(
      "",
      "",
      "",
      "michael"
    );

    assert.equal(
      contributorId,
      "0x0c55D3B26A1229B9D707a4272F55E66103301858",
      "Failed to get a contributor's id based on their name"
    );
  });
});
