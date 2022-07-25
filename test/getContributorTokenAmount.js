import assert from "assert";
import createRepo from "../lib/createRepo.js";
import createUser from "../lib/createUser.js";
import getContributorTokenAmount from "../lib/getContributorTokenAmount.js";
import transferTokens from "../lib/transferTokens.js";

describe("getContributorTokenAmount", function () {
  it("should return the number of tokens a contributor has for a repo", async function () {
    await createRepo("ben", "ben/demo", "", "111", "");

    await transferTokens(
      /*owner*/ "ben",
      /*repo_id*/ "ben/demo",
      /*from*/ "111",
      /*to*/ "222",
      /*amount*/ "500000"
    );

    await transferTokens(
      /*owner*/ "ben",
      /*repo_id*/ "ben/demo",
      /*from*/ "111",
      /*to*/ "333",
      /*amount*/ "250000"
    );

    await transferTokens(
      /*owner*/ "ben",
      /*repo_id*/ "ben/demo",
      /*from*/ "111",
      /*to*/ "333",
      /*amount*/ "200000"
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
      50_000,
      "Failed to get contributor token amount"
    );

    assert.equal(
      Number(resLouisTokenAmount),
      500_000,
      "Failed to get contributor token amount"
    );

    assert.equal(
      Number(resThibautTokenAmount),
      450_000,
      "Failed to get contributor token amount"
    );
  });
});
