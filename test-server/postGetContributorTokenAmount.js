const assert = require("assert");
const { postGetContributorTokenAmount } = require("../src/requests");

describe("postGetContributorTokenAmount", function () {
  it("should return the number of tokens a contributor has for a repo", async function () {
    let resMichaelTokenAmount = await postGetContributorTokenAmount(
      /*owner:*/ "",
      /*repo:*/ "joseph/demo",
      /*pr_id:*/ "",
      /*contributor:*/ "0x0c55D3B26A1229B9D707a4272F55E66103301858",
      /*side:*/ ""
    );

    assert.equal(
      Number(resMichaelTokenAmount),
      50_000,
      "Failed to get contributor token amount"
    );
  });
});
