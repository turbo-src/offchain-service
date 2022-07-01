var assert = require("assert");
import transferTokens, { getTokenAmount } from "../lib";

describe("transferTokens", function () {
  it("should return the number of tokens a contributor has for a repo", async function () {
    let newRepo = await createRepo("john", "john/myRepo", "", "222", "");

    let resTokenAmount = await getContributorTokenAmount(
      /*owner:*/ "",
      /*repo:*/ "john/myRepo",
      /*pr_id:*/ "",
      /*contributor:*/ "222",
      /*side:*/ ""
    );

    let tokenAmount = Number(resTokenAmount);

    assert.equal(
      tokenAmount,
      1_000_000,
      "Failed to get contributor token amount"
    );
  });
});
