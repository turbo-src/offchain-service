var assert = require("assert");
import createRepo, { getTokenAmount } from "../lib";
import Repo from "../db";

describe("createRepo", function () {
  it("should create a repo and return a token amount of 1000000", async function () {
    await createRepo("john", "john/myRepo", "", contributor, "");

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
