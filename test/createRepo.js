var assert = require("assert");
import createRepo, { getTokenAmount } from "../lib";

describe("createRepo", function () {
  it("should return a new repo id", async function () {
    let newRepo = await createRepo("owner/myRepo");
    let tokenAmount = await getTokenAmount("owner/myRepo");
    assert.equal(
      tokenAmount,
      1_000_000,
      "Failed to create a repo in the database"
    );
  });
});
