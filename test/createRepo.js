import assert from "assert";
import createRepo from "../lib/createRepo.js";
import getRepoTokenAmount from "../lib/getRepoTokenAmount.js";
import createUser from "../lib/createUser.js";

describe("createRepo", function () {
  it("should create a repo and return a token amount of 1000000", async function () {
    await createUser(
      /*owner:*/ "",
      /*repo:*/ "",
      /*contributor_id:*/ "222",
      /*contributor_name:*/ "john",
      /*contributor_signature:*/ "2ae123"
    );
    await createRepo("john", "john/myRepo", "", "222", "");

    let resTokenAmount = await getRepoTokenAmount(
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
