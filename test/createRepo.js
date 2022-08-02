const assert = require("assert");
const { getRepoTokenAmount, createRepo } = require("../lib");

describe("createRepo", function () {
  it("should create a repo and return a token amount of 1000000", async function () {
    await createRepo(
      "joseph",
      "joseph/demo",
      "",
      "0x0c0DDaD894E3436C34AecD5722F0798Da88Bc971",
      ""
    );

    let resTokenAmount = await getRepoTokenAmount(
      /*owner:*/ "",
      /*repo:*/ "joseph/demo",
      /*pr_id:*/ "",
      /*contributor:*/ "",
      /*side:*/ ""
    );

    let tokenAmount = Number(resTokenAmount);

    assert.equal(
      tokenAmount,
      1_000_000,
      "Failed to create a repo in the database"
    );
  });
});
