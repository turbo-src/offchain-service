var assert = require("assert");
import createRepo, { getTokenAmount } from "../lib";

describe("createRepo", function () {
  it("should return a token amount of 1000000", async function () {
    let newRepo = await createRepo("john", "john/myRepo", "", contributor, "");

    let resTokenAmount = await getTokenAmount(
      /*owner:*/ "",
      /*repo:*/ "john/myRepo",
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
