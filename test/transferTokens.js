var assert = require("assert");
import transferTokens, { getTokenAmount } from "../lib";

describe("transferTokens", function () {
  it("should transfer tokens between two contributors", async function () {
    let newRepo = await createRepo("john", "john/myRepo", "", "222", "");

    let mary = await createContributor(
      /*owner:*/ "",
      /*repo:*/ "",
      /*contributor_id:*/ "111",
      /*contributor_name:*/ "mary",
      /*contributor_signature:*/ "456"
    );

    await transferTokens(
      /*owner*/ "john",
      /*repo_id*/ "john/myRepo",
      /*from*/ "222",
      /*to*/ "111",
      /*amount*/ "500000"
    );

    let resTokenAmount = await getContributorTokenAmount(
      /*owner:*/ "john",
      /*repo:*/ "john/myRepo",
      /*pr_id:*/ "issue_1",
      /*contributor:*/ "mary",
      /*side:*/ "no"
    );

    let tokenAmount = Number(resTokenAmount);

    assert.equal(
      tokenAmount,
      5_00_000,
      "Failed to transfer tokens between two contributors"
    );
  });
});
