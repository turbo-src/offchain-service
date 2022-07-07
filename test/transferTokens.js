import assert from "assert";
import createRepo from "../lib/createRepo.js";
import getContributorTokenAmount from "../lib/getContributorTokenAmount.js";

describe("transferTokens", function () {
  it("should transfer tokens between two contributors", async function () {
    await createRepo("john", "john/demo", "", "222", "");

    await createUser(
      /*owner:*/ "",
      /*repo:*/ "",
      /*contributor_id:*/ "111",
      /*contributor_name:*/ "mary",
      /*contributor_signature:*/ "456"
    );

    await createUser(
      /*owner:*/ "",
      /*repo:*/ "",
      /*contributor_id:*/ "444",
      /*contributor_name:*/ "john",
      /*contributor_signature:*/ "345"
    );

    await transferTokens(
      /*owner*/ "john",
      /*repo_id*/ "john/myRepo",
      /*from*/ "222",
      /*to*/ "111",
      /*amount*/ "500000"
    );

    let resTokenAmount = await getContributorTokenAmount(
      /*owner:*/ "",
      /*repo:*/ "john/myRepo",
      /*pr_id:*/ "",
      /*contributor:*/ "mary",
      /*side:*/ ""
    );

    let tokenAmount = Number(resTokenAmount);

    assert.equal(
      tokenAmount,
      5_00_000,
      "Failed to transfer tokens between two contributors"
    );
  });
});
