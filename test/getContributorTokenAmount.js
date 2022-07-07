import assert from "assert";
import createRepo from "../lib/createRepo.js";
import createUser from "../lib/createUser.js";
import getContributorTokenAmount from "../lib/getContributorTokenAmount.js";
import transferTokens from "../lib/transferTokens.js";

describe("getContributorTokenAmount", function () {
  it("should return the number of tokens a contributor has for a repo", async function () {
    await createUser(
      /*owner:*/ "",
      /*repo:*/ "",
      /*contributor_id:*/ "111",
      /*contributor_name:*/ "ben",
      /*contributor_signature:*/ "456"
    );
    await createUser(
      /*owner:*/ "",
      /*repo:*/ "",
      /*contributor_id:*/ "222",
      /*contributor_name:*/ "louis",
      /*contributor_signature:*/ "789"
    );
    await createUser(
      /*owner:*/ "",
      /*repo:*/ "",
      /*contributor_id:*/ "333",
      /*contributor_name:*/ "thibaut",
      /*contributor_signature:*/ "012"
    );

    await createRepo("ben", "ben/demo", "", "111", "");

    await transferTokens(
      /*owner*/ "ben",
      /*repo_id*/ "ben/demo",
      /*from*/ "111",
      /*to*/ "222",
      /*amount*/ "250000"
    );

    await transferTokens(
      /*owner*/ "ben",
      /*repo_id*/ "ben/demo",
      /*from*/ "111",
      /*to*/ "333",
      /*amount*/ "250000"
    );

    let resBenTokenAmount = await getContributorTokenAmount(
      /*owner:*/ "",
      /*repo:*/ "ben/demo",
      /*pr_id:*/ "",
      /*contributor:*/ "111",
      /*side:*/ ""
    );

    let resLouisTokenAmount = await getContributorTokenAmount(
      /*owner:*/ "",
      /*repo:*/ "ben/demo",
      /*pr_id:*/ "",
      /*contributor:*/ "222",
      /*side:*/ ""
    );

    let resThibautTokenAmount = await getContributorTokenAmount(
      /*owner:*/ "",
      /*repo:*/ "ben/demo",
      /*pr_id:*/ "",
      /*contributor:*/ "333",
      /*side:*/ ""
    );

    assert.equal(
      Number(resBenTokenAmount),
      500_000,
      "Failed to get contributor token amount"
    );

    assert.equal(
      Number(resLouisTokenAmount),
      250_000,
      "Failed to get contributor token amount"
    );

    assert.equal(
      Number(resThibautTokenAmount),
      250_000,
      "Failed to get contributor token amount"
    );
  });
});
