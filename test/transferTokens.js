var assert = require("assert");
import transferTokens from "../lib";

describe("transferTokens", function () {
  it("should transfer tokens between two contributors", async function () {
    let newRepo = await createRepo(
      "johnd",
      "johnd/myRepo",
      "",
      contributor,
      ""
    );

    await transferTokens(
      /*owner*/ "johnd",
      /*repo_id*/ "johnd/myRepo",
      /*from*/ from(contributor_id),
      /*to*/ to(contributor_id),
      /*amount*/ amount
    );

    assert.equal(
      tokenAmount,
      1_000_000,
      "Failed to create a repo in the database"
    );
  });
});
