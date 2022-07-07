import assert from "assert";
import createRepo from "../lib/createRepo.js";
import getContributorTokenAmount from "../lib/getContributorTokenAmount.js";
import createUser from "../lib/createUser.js";
import transferTokens from "../lib/transferTokens.js";

describe("transferTokens", function () {
  it("should transfer tokens between two contributors", async function () {
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
      /*contributor_name:*/ "joseph",
      /*contributor_signature:*/ "345"
    );

    await createRepo("joseph", "joseph/demo", "", "444", "");

    await transferTokens(
      /*owner*/ "joseph",
      /*repo_id*/ "joseph/demo",
      /*from*/ "444",
      /*to*/ "111",
      /*amount*/ "500001"
    );

    let resTokenAmount = await getContributorTokenAmount(
      /*owner:*/ "joseph",
      /*repo:*/ "joseph/demo",
      /*pr_id:*/ "",
      /*contributor_name:*/ "mary",
      /*side:*/ ""
    );

    let tokenAmount = Number(resTokenAmount);

    assert.equal(
      tokenAmount,
      5_00_001,
      "Failed to transfer tokens between two contributors"
    );
  });
});
