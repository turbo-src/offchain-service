var assert = require("assert");
import getTokenAmount from "../lib";

describe("getTokenAmount", function () {
  it("should return the amount of tokens belonging to a repo", async function () {
    let newRepo = await createRepo("owner/myRepo");
    let tokenAmount = await getTokenAmount("owner/myRepo");
    assert.equal(
      tokenAmount,
      1_000_000,
      "Failed to create a repo in the database"
    );
  });
});
